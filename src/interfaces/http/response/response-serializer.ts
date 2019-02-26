import { ResponseInterface } from "../../../contracts/infra/response";
import { Response } from "../../../domain";

export const ResponseSerializer = {
  serializeResult(response: any) {
    let { result } = response;
    result = tranformData(result);
    response.result = result;
    return response;
  },

  serialize(response: ResponseInterface[] | Response) {
    if (Array.isArray(response)) {
      return tranformData(response);
    }
    return {
      id: response.getId(),
      form: response.getForm(),
      notes: response.getNotes(),
      status: response.getStatus(),
      content: response.getContent(),
      respondant: response.getRespondant(),
      createdAt: response.getCreationDate(),
      updatedAt: response.getLastMoficationDate()
    };
  }
};

const tranformData = (response: ResponseInterface[]) => {
  return response.map((res: ResponseInterface) => {
    return {
      id: res._id,
      form: res.form,
      notes: res.notes,
      status: res.status,
      branche: res.branch,
      content: res.content,
      updatedAt: res.updatedAt,
      createdAt: res.createdAt,
      respondant: res.respondant,
      processors: res.processors
    };
  });
};
