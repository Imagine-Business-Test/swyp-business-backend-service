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
    return this.model.find({ "form._id": form, deleted: false }).sort({ createdAt: -1 });
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

  async count(field?: { [name: string]: string }) {
    if (field) {
      return this.model.count(field);
    }
    return this.model.count({});
  }

  async findBStatus(status: string, page: number = 1, limit: number = 10) {
    const skip = ( page * limit ) - limit;
    const countPromise = this.model.count({ status });
    const queryPromise = this.model.find({ status }).skip(skip).limit(limit).sort({ createdAt: -1 });
    // @ts-ignore
    const [result, count] = await Promise.all([ queryPromise, countPromise ]);
    const pages = Math.ceil(count / limit);

    return { result, count, pages };
  }

  async getProcessingActivityStats() {
    const match = { $match: { status: "processed" } };
    const group = { $group: { _id: "$processor.name", count: { $sum: 1 } } };
    const total = { $group: { _id: null, total: { $sum: 1 }, users: { $push: "$$ROOT" } } };
    return this.model.aggregate([ match, group, total ]);
  }

  async getNotingActivityStats() {
    const match = { $match: { status: "noted" } };
    const group = { $group: { _id: "$notedBy.name", count: { $sum: 1 } } };
    const total = { $group: { _id: null, total: { $sum: 1 }, users: { $push: "$$ROOT" } } };
    return this.model.aggregate([ match, group, total ] );
  }

  private async update(
    condition: { [key: string]: any}, update: {[key: string]: { [key: string]: any } }
  ) {
    try {
      const result = await this.model.updateOne(condition, update);
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw  new Error(
          `Error updating response: ${result.nModified } updated `
        );
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }
}
