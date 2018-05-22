import { FormInterface } from "../../contracts/infra";
import { Form } from "../../domain";

export const MongoFormMapper = {
  toEntity(doc: FormInterface) {
    const {
      _id, name, workStation, lastUpdatedBy, deleted, content, updateAt,
      createdAt
    } = doc;

    return new Form(
      name, workStation, content, lastUpdatedBy, updateAt, createdAt, _id, deleted
    );
  },

  toDatabase(form: Form) {
    return {
      name: form.name,
      workStation: form.workStation,
      content: form.content,
      lastUpdatedBy: form.lastUpdateBy,
      updateAt: form.updatedAt,
      createdAt: form.createAt,
      deleted: form.deleted
    };
  }
};
