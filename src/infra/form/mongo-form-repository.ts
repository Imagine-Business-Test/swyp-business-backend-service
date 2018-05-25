import { FormModel, FormInterface } from "../../contracts/infra";
import { FormRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";
import { MongoFormMapper } from "./mongo-form-mapper";
import { Form } from "../../domain";


export class MongoFormRepository implements FormRepository {
  private model: FormModel;

  constructor(model: FormModel) {
    this.model = model;
  }

  async add(form: Form) {
    try {
      const doc: FormInterface = await this.model.create(
        MongoFormMapper.toDatabase(form)
      );
      return MongoFormMapper.toEntity(doc);
    } catch (ex) {
      ex.detail = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async getByWorkstation (workstation: string): Promise<FormInterface[]> {
    return this.model.find(
      { workstation: workstation, status: "active", deleted: false }
    );
  }

  async updateContent(id: string, content: string) {
    try {
      const result = await this.model.updateOne(
        { _id: id },
        { $set: { content: content }}
      );
      if (result.nModified !== 1 && result.nMatched === 1) {
        throw  new Error(`Error updating content ${result.nModified} affected`);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async disable(id: string) {
    try {
      const result = await this.model.updateOne(
        { _id: id },
        { $set: { status: "disabled" } }
      );
      if (result.nModified !== 1 && result.nMatched === 1) {
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
      if (result.nModified !== 1 && result.nMatched === 1) {
        throw  new Error(`Error deleting form: ${result.nModified } affected `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }
}
