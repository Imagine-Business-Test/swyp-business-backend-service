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
          elements: form.elements,
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
      updatedAt: response.getLastUpdateDate(),
      workspace: response.getWorkspace(),
      created: response.getCreationDate(),
      business: response.getBusiness(),
      creator: response.getCreator(),
      elements: response.getElements(),
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
      elements: response.getElements(),
      id: response.getId(),
      business: response.getBusiness()
    };
  }
};
