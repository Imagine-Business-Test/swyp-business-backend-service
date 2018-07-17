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
      content,
      updateAt,
      createdAt
    } = doc;

    return new Form(
      name,
      slug,
      workspace,
      business,
      content,
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
      workspace: form.getWorkspace(),
      business: form.getBusiness(),
      updateAt: form.getLastUpdateDate(),
      creator: form.getCreator(),
      createdAt: form.getCreationDate(),
      content: form.getContent(),
      deleted: form.isDeleted(),
      slug: form.getSlug(),
      name: form.getName()
    };
  }
};
