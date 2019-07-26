import { FormInterface, FormModel } from "../../contracts/infra";
import { IFormRepository } from "../../contracts/repositories";
import { ILoggedInUser } from "../../contracts/interfaces";
import { MongoFormMapper } from "./mongo-form-mapper";
import { Form } from "../../domain";

export class MongoFormRepository implements IFormRepository {
  private model: FormModel;

  constructor(formModel: FormModel) {
    this.model = formModel;
  }

  public async add(form: Form) {
    try {
      /*
        Still to be done:
        *** Ensure no other form by the same bank has the same slug as this new form
      */
      const doc: FormInterface = await this.model.create(
        MongoFormMapper.toDatabase(form)
      );
      return MongoFormMapper.toEntity(doc);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async find(id: string): Promise<Form> {
    try {
      const doc = await this.model.findOne({ _id: id });
      if (!doc) {
        throw new Error(`Account not found`);
      }
      return MongoFormMapper.toEntity(doc);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async fetchContentOf(options: {
    formSlug: string;
    formType: string;
    formTypeParent: string;
    businessSlug: string;
  }): Promise<Form> {
    try {
      const { formSlug, formType, formTypeParent, businessSlug } = options;
      const doc = await this.model.findOne({
        "workspace.parent": formTypeParent,
        "business.slug": businessSlug,
        "workspace.name": formType,
        slug: formSlug
      });
      if (!doc) {
        throw new Error("The specified form record is not found");
      }
      return MongoFormMapper.toEntity(doc);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async fetchByBusiness(
    business: string,
    formType: string,
    formTypeParent: string
  ): Promise<FormInterface[]> {
    return this.model
      .find({
        "business.id": business,
        "workspace.name": formType,
        "workspace.parent": formTypeParent,
        status: "active",
        deleted: false
      })
      .limit(50)
      .select("name slug workspace elements _id");
  }

  public async fetchByWorkspace(
    workspace: string,
    businessId: string
  ): Promise<FormInterface[]> {
    return this.model.find({
      "workspace.id": workspace,
      "business.id": businessId,
      status: "active",
      deleted: false
    });
  }

  public async updateContent(
    id: string,
    content: string,
    modifier: ILoggedInUser
  ) {
    try {
      const result = await this.model.updateOne(
        { _id: id },
        { $set: { content, lastModifier: modifier } }
      );
      if (result.nModified !== 1) {
        throw new Error(`Error updating content ${result.nModified} updated`);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async disable(id: string, modifier: ILoggedInUser) {
    try {
      const result = await this.model.updateOne(
        { _id: id },
        { $set: { status: "disabled", lastUpdatedBy: modifier } }
      );
      if (result.nModified !== 1) {
        throw new Error(`Error disabling form: ${result.nModified} affected `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async delete(id: string, user: ILoggedInUser) {
    try {
      const result = await this.model.updateOne(
        { _id: id },
        { $set: { deleted: true, lastUpdatedBy: user } }
      );
      if (result.nModified !== 1) {
        throw new Error(`Error deleting form: ${result.nModified} deleted `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }
}
