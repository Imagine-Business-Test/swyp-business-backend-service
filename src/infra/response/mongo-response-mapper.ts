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
      processor
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
      processor,
      createdAt,
      updatedAt
    );
  },

  toDatabase(response: Response) {
    return {
      respondant: response.getRespondant(),
      form: response.getForm(),
      branch: response.getBranch(),
      content: response.getContent(),
      status: response.getStatus(),
      deleted: response.isDeleted(),
      createdAt: response.getCreationDate(),
      updatedAt: response.getLastMoficationDate()
    };
  }
};
