import { FormInterface, FormModel } from "../../contracts/infra";
import { ILoggedInUser } from "../../contracts/interfaces";
import { IFormRepository } from "../../contracts/repositories";
import { Form } from "../../domain";
import { MongoFormMapper } from "./mongo-form-mapper";

export class MongoFormRepository implements IFormRepository {
  private model: FormModel;

  constructor(formModel: FormModel) {
    this.model = formModel;
  }

  public async add(form: Form) {
    try {
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
        throw new Error("The specified form record is not found");
      }
      return MongoFormMapper.toEntity(doc);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }
  public async getByBusiness(business: string): Promise<FormInterface[]> {
    return this.model
      .find({
        $or: [
          { "business.name": { $regex: new RegExp("^" + business, "i") } },
          { "business.id": business }
        ],
        status: "active",
        deleted: false
      })
      .limit(10)
      .select("name slug _id");
  }

  public async getByWorkspace(workspace: string): Promise<FormInterface[]> {
    return this.model.find({ workspace, status: "active", deleted: false });
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
      if (result.nModified !== 1 || result.nMatched === 1) {
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
      if (result.nModified !== 1 || result.nMatched === 1) {
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
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw new Error(`Error deleting form: ${result.nModified} deleted `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }
}
