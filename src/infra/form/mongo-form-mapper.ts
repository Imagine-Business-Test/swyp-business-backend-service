import { FormInterface } from "../../contracts/infra";
import { Form } from "../../domain";

export const MongoFormMapper = {
  toEntity(doc: FormInterface): Form {
    const {
      _id,
      name,
      slug,
      workspace,
      business,
      status,
      creator,
      lastModifier,
      deleted,
      elements,
      updateAt,
      createdAt
    } = doc;

    return new Form(
      name,
      slug,
      workspace,
      business,
      elements,
      status,
      creator,
      lastModifier,
      deleted,
      _id,
      updateAt,
      createdAt
    );
  },

  toDatabase(form: Form) {
    return {
      lastModifier: form.getLastModifier(),
      updateAt: form.getLastUpdateDate(),
      createdAt: form.getCreationDate(),
      workspace: form.getWorkspace(),
      business: form.getBusiness(),
      creator: form.getCreator(),
      elements: form.getElements(),
      deleted: form.isDeleted(),
      slug: form.getSlug(),
      name: form.getName()
    };
  }
};
