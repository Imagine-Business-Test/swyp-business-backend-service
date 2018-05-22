import { FormInterface } from "../../contracts/infra";
import { Form } from "../../domain";

export const MongoFormMapper = {
  toEntity(doc: FormInterface): Form {
    const {
      _id, name, workStation, createdBy, lastUpdatedBy, deleted, content, updateAt,
      createdAt
    } = doc;

    return new Form(
      name, workStation, content, createdBy, lastUpdatedBy, deleted, updateAt, createdAt, _id,
    );
  },

  toDatabase(form: Form) {
    return {
      name: form.name,
      workStation: form.workStation,
      content: form.content,
      createdBy: form.createdBy,
      lastUpdatedBy: form.lastUpdateBy,
      updateAt: form.updatedAt,
      createdAt: form.createAt,
      deleted: form.deleted
    };
  }
};
