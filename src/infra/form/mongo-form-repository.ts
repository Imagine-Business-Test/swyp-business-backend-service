import { MongoFormMapper } from "./mongo-form-mapper";
import { FormModel, FormInterface } from "../../contracts/infra";
import { Form } from "../../domain";


export class MongoFormRepository {
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

  async delete(form: Form) {
    return this.model.updateOne({ _id: form._id }, { $set: { deleted: form.deleted } } );
  }
}
