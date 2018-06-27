import { Form } from "../../../domain";
import { FormInterface } from "../../../contracts/infra";

export const FormSerializer = {
  serialize(response: FormInterface[] | Form) {
    if (Array.isArray(response)) {
      return response.map(form => {
        return {
          status: form.status,
          workstation: form.workstation,
          business: form.business,
          content: form.content,
          creator: form.creator,
          lastModifier: form.lastModifier,
          createdAt: form.createdAt,
          updatedAt: form.updateAt,
          _id: form._id
        };
      });
    }
    return {
      lastModifier: response.getLastModifier(),
      workstation: response.getWorkstationId(),
      updatedAt: response.getLastUpdateDate(),
      created: response.getCreationDate(),
      business: response.getBusiness(),
      creator: response.getCreator(),
      content: response.getContent(),
      name: response.getName(),
      _id: response.getId()
    };
  }
};
