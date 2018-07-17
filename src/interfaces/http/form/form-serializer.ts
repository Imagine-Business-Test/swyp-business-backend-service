import { FormInterface } from "../../../contracts/infra";
import { Form } from "../../../domain";

export const FormSerializer = {
  serialize(response: FormInterface[] | Form) {
    if (Array.isArray(response)) {
      return response.map(form => {
        return {
          status: form.status,
          name: form.name,
          workspace: form.workspace,
          business: form.business,
          content: form.content,
          creator: form.creator,
          lastModifier: form.lastModifier,
          createdAt: form.createdAt,
          updatedAt: form.updateAt,
          id: form._id
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
      id: response.getId()
    };
  }
};
