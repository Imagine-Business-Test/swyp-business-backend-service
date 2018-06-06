import { Form } from "../../../domain";
import { FormInterface } from "../../../contracts/infra";

export const FormSerializer = {
  serialize(response: FormInterface[] | Form) {
    if (Array.isArray(response)) {
      return response.map(form => {
        return {
          status: form.status,
          workstation: form.workstation,
          content: form.content,
          creator: form.creator,
          lastModifier: form.lastModifier,
          createdAt: form.createdAt,
          updatedAt: form.updateAt
        };
      });
    }
    return {
      lastModifier: response.getLastModifier(),
      workstation: response.getWorkstationId(),
      updatedAt: response.getLastUpdateDate(),
      created: response.getCreationDate(),
      creator: response.getCreator(),
      content: response.getContent(),
      name: response.getName(),
      _id: response.getId()
    };
  }
};
