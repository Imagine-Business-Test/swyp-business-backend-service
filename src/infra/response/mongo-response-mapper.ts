import { ResponseInterface } from "../../contracts/infra/response";
import { Response } from "../../domain";

export const MongoResponseMapper = {
  toEntity(doc: ResponseInterface): Response {
    const {
      _id, respondant, deleted, content, status, updatedAt, createdAt, form
    } = doc;
    return new Response(
      respondant, form, content, status, deleted, _id, createdAt, updatedAt
    );
  },

  toDatabase(response: Response) {
    return {
      respondant: response.getRespondant(),
      form      : response.getFormId(),
      content   : response.getContent(),
      status    : response.getStatus(),
      deleted   : response.isDeleted(),
      createdAt : response.getCreationDate(),
      updatedAt : response.getLastMoficationDate()
    };
  }
};
