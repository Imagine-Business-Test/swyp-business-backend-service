import { FormModel, FormInterface } from "../../contracts/infra";
import { FormRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";
import { MongoFormMapper } from "./mongo-form-mapper";
import { Form } from "../../domain";


export class MongoFormRepository implements FormRepository {
  private model: FormModel;

  constructor(formModel: FormModel) {
    this.model = formModel;
  }

  async add(form: Form) {
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

  async find(id: string): Promise<Form> {
    try {
      const doc = await this.model.findOne({ _id: id});
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

  async getByBusiness(business: string): Promise<FormInterface[]> {
    return this.model.find(
      { business, status: "active", deleted: false  }
    ).limit(10);
  }

  async getByWorkspace (workspace: string): Promise<FormInterface[]> {
    return this.model.find(
      { workspace: workspace, status: "active", deleted: false }
    );
  }

  async updateContent(id: string, content: string, modifier: LoggedInUser) {
    try {
      const result = await this.model.updateOne(
        { _id: id },
        { $set: { content: content, lastModifier: modifier }}
      );
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw  new Error(`Error updating content ${result.nModified} updated`);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async disable(id: string, modifier: LoggedInUser) {
    try {
      const result = await this.model.updateOne(
        { _id: id },
        { $set: { status: "disabled", lastUpdatedBy: modifier } }
      );
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw  new Error(`Error disabling form: ${result.nModified } affected `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async delete(id: string, user: LoggedInUser) {

    try {
      const result = await this.model.updateOne(
        { _id: id },
        { $set: { deleted: true, lastUpdatedBy: user } }
      );
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw  new Error(`Error deleting form: ${result.nModified } deleted `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }
}
