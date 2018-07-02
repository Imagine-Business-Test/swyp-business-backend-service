import { ResponseModel, ResponseInterface } from "../../contracts/infra/response";
import { ResponseRepository } from "../../contracts/repositories";
import { MongoResponseMapper } from "./mongo-response-mapper";
import { Response } from "../../domain";
import { LoggedInUser } from "../../contracts/interfaces";

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
    await this.update({_id: id}, { $set: { content: content } });
  }

  async makeAsprocessed(id: string, processor: LoggedInUser) {
    await this.update({_id: id}, { $set: { status:  "processed", processor } });
  }

  async delete(id: string) {
    await this.update( {_id: id}, { $set: { deleted:  true }});
  }

  async addNote(id: string, note: string, notedBy: LoggedInUser) {
    await this.update({ _id: id }, { $set: { note, notedBy, status: "noted" } });
  }

  async findBStatus(status: string, page: number = 1, limit: number = 10) {
    const skip = ( page * limit ) - limit;
    const result = await this.model.find({ status }).skip(skip).limit(limit).sort({ createdAt: -1 });
    const count = await this.model.count({});
    const pages = Math.ceil(count / limit);

    return { skip, result, count, pages };
  }

  async getUserProcessingActivityStats() {
    const query = { $group: { _id: "$processor.name", count: { $sum: 1 } } };
    return this.model.aggregate([ query, { $sort: { count: -1 } } ]);
  }

  async getUserNotingActivityStats() {
    const query = { $group: { _id: "$notedBy.name", count: { $sum: 1 } } };
    return this.model.aggregate([ query, { $sort: { count: -1 } } ] );
  }

  private async update(
    condition: { [key: string]: any}, update: {[key: string]: { [key: string]: any } }
  ) {
    try {
      const result = await this.model.updateOne(condition, update);
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
