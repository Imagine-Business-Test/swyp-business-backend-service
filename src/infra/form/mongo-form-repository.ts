import { FormModel, FormInterface, UpdateResult } from "../../contracts/infra";
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

  async updateContent(id: string, content: string): Promise<UpdateResult> {
    return this.model.updateOne(
      { _id: id },
      { $set: { content: content }}
    );
  }

  async disable(formId: string): Promise<UpdateResult> {
    return this.model.updateOne(
      { _id: formId },
      { $set: { status: "disabled" } } );
  }

  async delete(id: string, user: LoggedInUser): Promise<UpdateResult> {
    return this.model.updateOne(
      { _id: id },
      { $set: { deleted: true, lastUpdatedBy: user } } );
  }
}
