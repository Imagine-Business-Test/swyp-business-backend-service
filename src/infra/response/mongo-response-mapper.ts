import { ResponseInterface } from "../../contracts/infra/response";
import { Response } from "../../domain";

export const MongoResponseMapper = {
  toEntity(doc: ResponseInterface): Response {
    const {
      _id, respondant, deleted, content, status, updatedAt, createdAt, form, note, notedBy, processor
    } = doc;
    return new Response(
      respondant, form, content, status, deleted, _id, note, processor, notedBy, createdAt, updatedAt
    );
  },

  toDatabase(response: Response) {
    return {
      respondant: response.getRespondant(),
      form      : response.getForm(),
      content   : response.getContent(),
      status    : response.getStatus(),
      deleted   : response.isDeleted(),
      createdAt : response.getCreationDate(),
      updatedAt : response.getLastMoficationDate()
    };
  }
};
