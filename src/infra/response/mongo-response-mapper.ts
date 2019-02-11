import { ResponseInterface } from "../../contracts/infra/response";
import { Response } from "../../domain";

export const MongoResponseMapper = {
  toEntity(doc: ResponseInterface): Response {
    const {
      _id,
      respondant,
      deleted,
      content,
      branch,
      status,
      updatedAt,
      createdAt,
      form,
      notes,
      processors
    } = doc;
    return new Response(
      respondant,
      branch,
      form,
      content,
      status,
      deleted,
      _id,
      notes,
      processors,
      createdAt,
      updatedAt
    );
  },

  toDatabase(response: Response) {
    return {
      updatedAt: response.getLastMoficationDate(),
      createdAt: response.getCreationDate(),
      respondant: response.getRespondant(),
      content: response.getContent(),
      branch: response.getBranch(),
      deleted: response.isDeleted(),
      status: response.getStatus(),
      form: response.getForm()
    };
  }
};
