import { FormInterface } from "../../../contracts/infra";
import { Form } from "../../../domain";

export const FormSerializer = {
  serialize(response: FormInterface[] | Form) {
    if (Array.isArray(response)) {
      return response.map(form => {
        return {
          name: form.name,
          workspace: form.workspace,
          business: form.business,
          content: form.content,
          creator: form.creator,
          lastModifier: form.lastModifier,
          createdAt: form.createdAt,
          updatedAt: form.updateAt,
          id: form._id,
          slug: form.slug
        };
      });
    }

    return {
      lastModifier: response.getLastModifier(),
      workspace: response.getWorkspace(),
      updatedAt: response.getLastUpdateDate(),
      created: response.getCreationDate(),
      business: response.getBusiness(),
      creator: response.getCreator(),
      content: response.getContent(),
      name: response.getName(),
      slug: response.getSlug(),
      id: response.getId()
    };
  },

  forBusiness(response: FormInterface[] | Form) {
    if (Array.isArray(response)) {
      return response.map(form => {
        return {
          name: form.name,
          id: form._id,
          slug: form.slug
        };
      });
    }

    return {
      content: response.getContent(),
      id: response.getId(),
      business: response.getBusiness()
    };
  }
};
