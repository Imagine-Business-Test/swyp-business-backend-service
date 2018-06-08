import { ResponseModel, ResponseInterface } from "../../contracts/infra/response";
import { ResponseRepository } from "../../contracts/repositories";
import { MongoResponseMapper } from "./mongo-response-mapper";
import { Response } from "../../domain";

export class MongoResponseRepository implements ResponseRepository {
  private model: ResponseModel;

  constructor(responseModel: ResponseModel) {
    this.model = responseModel;
  }

  async add(response: Response): Promise<Response> {
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

  async getByForm(form: string): Promise<ResponseInterface[]> {
    return this.model.find({ form, deleted: false });
  }

  async updateContent(id: string, content: string) {
    try {
      const result = await this.model.updateOne(
        {_id: id},
        { $set: { content: content }}
      );
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw  new Error(`Error updating content: ${result.nModified } updated `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async makeAsprocessed(id: string) {
    console.log(id);
    try {
      const result = await this.model.updateOne(
        {_id: id},
        { $set: { status:  "processed"}}
      );
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw  new Error(
          `Error marking response as processed: ${result.nModified } processed `
        );
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async delete(id: string) {
    try {
      const result = await this.model.updateOne(
        {_id: id},
        { $set: { deleted:  true }}
      );
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw  new Error(
          `Error deleting response: ${result.nModified } deleted `
        );
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }
}
