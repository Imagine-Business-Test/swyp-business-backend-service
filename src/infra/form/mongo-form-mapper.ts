import { FormInterface } from "../../contracts/infra";
import { Form } from "../../domain";

export const MongoFormMapper = {
  toEntity(doc: FormInterface): Form {
    const {
      _id, name, workstation, status, creator, lastModifier, deleted, content, updateAt,
      createdAt
    } = doc;

    return new Form(
      name, workstation, content, status, creator, lastModifier, deleted, _id, updateAt, createdAt,
    );
  },

  toDatabase(form: Form) {
    return {
      lastUpdatedBy: form.getLastModifier(),
      workStation  : form.getWorkstationId(),
      updateAt     : form.getLastUpdateDate(),
      createdBy    : form.getCreator(),
      createdAt    : form.getCreationDate(),
      content      : form.getContent(),
      deleted      : form.isDeleted(),
      name         : form.getName(),
    };
  }
};
