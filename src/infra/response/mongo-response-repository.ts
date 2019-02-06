import { IResponseRepository } from "../../contracts/repositories";
import { MongoResponseMapper } from "./mongo-response-mapper";
import { ILoggedInUser } from "../../contracts/interfaces";
import { Response } from "../../domain";
import {
  ResponseInterface,
  ResponseModel
} from "../../contracts/infra/response";

export class MongoResponseRepository implements IResponseRepository {
  private model: ResponseModel;

  constructor(responseModel: ResponseModel) {
    this.model = responseModel;
  }

  public async getByForm(form: string): Promise<ResponseInterface[]> {
    return this.model
      .find({ "form.id": form, deleted: false })
      .sort({ createdAt: -1 });
  }

  public async addNote(id: string, note: string, notedBy: ILoggedInUser) {
    try {
      // @ts-ignore
      const doc: ResponseInterface = await this.model.findOneAndUpdate(
        { _id: id },
        {
          $addToSet: { notes: { note, notedBy, date: new Date() } },
          $set: { updatedAt: new Date() }
        },
        {
          new: true
        }
      );

      return MongoResponseMapper.toEntity(doc);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async makeAsprocessed(id: string, processor: ILoggedInUser) {
    await this.update(
      { _id: id },
      { $set: { status: "processed", processor, updatedAt: new Date() } }
    );
  }

  public async count(field?: { [name: string]: string }) {
    if (field) {
      return this.model.count(field);
    }
    return this.model.count({});
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

  public async updateContent(id: string, content: string) {
    await this.update({ _id: id }, { $set: { content } });
  }

  public async getProcessingActivityStats() {
    const match = { $match: { status: "processed" } };
    const group = { $group: { _id: "$processor.name", count: { $sum: 1 } } };
    return this.model.aggregate([match, group]);
  }

  public async getNotingActivityStats() {
    const match = { $match: { status: "noted" } };
    const group = { $group: { _id: "$notedBy.name", count: { $sum: 1 } } };
    return this.model.aggregate([match, group]);
  }

  public async delete(id: string) {
    await this.update(
      { _id: id },
      { $set: { deleted: true, updatedAt: new Date() } }
    );
  }

  public async findByStatus(
    business: string,
    branch: string,
    status: string,
    page: number = 1,
    limit: number = 25,
    from?: Date,
    to?: Date
  ) {
    const skip = page * limit - limit;
    const fromDate = new Date(from!);
    const toDate = new Date(to!);
    const condition =
      from && to
        ? {
            "form.business": business,
            status,
            createdAt: { $gte: fromDate, $lte: toDate }
          }
        : { "form.business": business, status };
    if (this.shouldUseBranchCondition(branch)) {
      // @ts-ignore
      condition.branch = branch;
    }
    const queryPromise = this.model
      .find(condition)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const countPromise = this.model.count(condition);
    // @ts-ignore
    const [result, count] = await Promise.all([queryPromise, countPromise]);
    const pages = Math.ceil(count / limit);

    return { result, count, pages };
  }

  private shouldUseBranchCondition(branch: string) {
    return branch === "HQ" ? false : true;
  }

  private async update(
    condition: { [key: string]: any },
    update: { [key: string]: { [key: string]: any } }
  ) {
    try {
      const result = await this.model.updateOne(condition, update);
      if (result.nModified !== 1) {
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
