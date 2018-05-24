import { FormInterface } from "../../contracts/infra";
import { Form } from "../../domain";

export const MongoFormMapper = {
  toEntity(doc: FormInterface): Form {
    const {
      _id, name, workStation, status, createdBy, lastUpdatedBy, deleted, content, updateAt,
      createdAt
    } = doc;

    return new Form(
      name, workStation, content, status, createdBy, lastUpdatedBy, deleted, updateAt, createdAt, _id,
    );
  },

  toDatabase(form: Form) {
    return {
      lastUpdatedBy: form.lastUpdateBy,
      workStation  : form.workStation,
      updateAt     : form.updatedAt,
      createdBy    : form.createdBy,
      createdAt    : form.createAt,
      content      : form.content,
      deleted      : form.deleted,
      name         : form.name,
    };
  }
};
