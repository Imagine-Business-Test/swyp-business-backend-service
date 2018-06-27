import { ResponseInterface } from "../../../contracts/infra/response";
import { Response } from "../../../domain";

export const ResponseSerializer = {
  serialize(response: ResponseInterface[] | Response) {
    if (Array.isArray(response)) {
      return response.map(res => {
        return {
          form: res.form,
          content: res.content,
          respondant: res.respondant,
          status: res.status,
          createdAt: res.createdAt,
          updatedAt: res.updatedAt,
          _id: res._id
        };
      });
    }
    return {
      form: response.getForm(),
      content: response.getContent(),
      respondant: response.getRespondant(),
      status: response.getStatus(),
      createdAt: response.getCreationDate(),
      updatedAt: response.getLastMoficationDate()
    };
  }
};
