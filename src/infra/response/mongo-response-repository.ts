import {
  ResponseInterface,
  ResponseModel
} from "../../contracts/infra/response";
import { ILoggedInUser } from "../../contracts/interfaces";
import { IResponseRepository } from "../../contracts/repositories";
import { Response } from "../../domain";
import { MongoResponseMapper } from "./mongo-response-mapper";

export class MongoResponseRepository implements IResponseRepository {
  private model: ResponseModel;

  constructor(responseModel: ResponseModel) {
    this.model = responseModel;
  }

  public async add(response: Response): Promise<Response> {
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

  public async getByForm(form: string): Promise<ResponseInterface[]> {
    return this.model
      .find({ "form.id": form, deleted: false })
      .sort({ createdAt: -1 });
  }

  public async updateContent(id: string, content: string) {
    await this.update({ _id: id }, { $set: { content } });
  }

  public async makeAsprocessed(id: string, processor: ILoggedInUser) {
    await this.update(
      { _id: id },
      { $set: { status: "processed", processor } }
    );
  }

  public async delete(id: string) {
    await this.update({ _id: id }, { $set: { deleted: true } });
  }

  public async addNote(id: string, note: string, notedBy: ILoggedInUser) {
    await this.update(
      { _id: id },
      { $set: { note, notedBy, status: "noted" } }
    );
  }

  public async count(field?: { [name: string]: string }) {
    if (field) {
      return this.model.count(field);
    }
    return this.model.count({});
  }

  public async findByStatus(
    business: string,
    status: string,
    page: number = 1,
    limit: number = 10
  ) {
    const skip = page * limit - limit;
    const countPromise = this.model.count({ status });
    const queryPromise = this.model
      .find({ "form.business": business, status })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    // @ts-ignore
    const [result, count] = await Promise.all([queryPromise, countPromise]);
    const pages = Math.ceil(count / limit);

    return { result, count, pages };
  }

  public async getProcessingActivityStats() {
    const match = { $match: { status: "processed" } };
    const group = { $group: { _id: "$processor.name", count: { $sum: 1 } } };
    const total = {
      $group: { _id: null, total: { $sum: 1 }, users: { $push: "$$ROOT" } }
    };
    return this.model.aggregate([match, group, total]);
  }

  public async getNotingActivityStats() {
    const match = { $match: { status: "noted" } };
    const group = { $group: { _id: "$notedBy.name", count: { $sum: 1 } } };
    const total = {
      $group: { _id: null, total: { $sum: 1 }, users: { $push: "$$ROOT" } }
    };
    return this.model.aggregate([match, group, total]);
  }

  private async update(
    condition: { [key: string]: any },
    update: { [key: string]: { [key: string]: any } }
  ) {
    try {
      const result = await this.model.updateOne(condition, update);
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw new Error(
          `Error updating response: ${result.nModified} updated `
        );
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }
}
