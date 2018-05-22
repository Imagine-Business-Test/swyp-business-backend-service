import { ResponseModel, ResponseInterface } from "../../contracts/infra/response";
import { MongoResponseMapper } from "./mongo-response-mapper";
import { Response } from "../../domain";

export class MongoResponseRepository {
  private model: ResponseModel;

  constructor(model: ResponseModel) {
    this.model = model;
  }

  async add(response: Response) {
    try {
      const doc: ResponseInterface = await this.model.create(
        MongoResponseMapper.toDatabase(response)
      );
      return MongoResponseMapper.toEntity(doc);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }
}
