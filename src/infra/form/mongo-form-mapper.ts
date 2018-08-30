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
      elementCount,
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
      elementCount,
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
      elementCount: form.getElementCount(),
      lastModifier: form.getLastModifier(),
      updateAt: form.getLastUpdateDate(),
      createdAt: form.getCreationDate(),
      workspace: form.getWorkspace(),
      business: form.getBusiness(),
      creator: form.getCreator(),
      content: form.getContent(),
      deleted: form.isDeleted(),
      slug: form.getSlug(),
      name: form.getName()
    };
  }
};
