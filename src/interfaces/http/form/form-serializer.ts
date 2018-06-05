import { Form } from "../../../domain";

export const FormSerializer = {
  serialize(response: Form) {
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
