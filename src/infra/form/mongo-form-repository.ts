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
    return this.model.find({ workstation: workstation });
  }

  async updateContent(id: string, content: string) {
    try {
      const result = await this.model.updateOne(
        { _id: id },
        { $set: { content: content }}
      );
      if (result.nModified !== 1 && result.nMatched === 1) {
        throw  new Error("Unable to update content");
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async disable(formId: string) {
    return this.model.updateOne(
      { _id: formId },
      { $set: { status: "disabled" } } );
  }

  async delete(id: string, user: LoggedInUser) {
    return this.model.updateOne(
      { _id: id },
      { $set: { deleted: true, lastUpdatedBy: user } } );
  }
}
