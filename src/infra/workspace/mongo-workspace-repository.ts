import { WorkspaceInterface, WorkspaceModel } from "../../contracts/infra";
import { IWorkspaceRepository } from "../../contracts/repositories";
import { ILoggedInUser } from "../../contracts/interfaces";
import { MongoWorkspaceMapper } from "./mongo-workspace-mapper";
import { Workspace } from "../../domain";

export class MongoWorkspaceRepository implements IWorkspaceRepository {
  private model: WorkspaceModel;

  constructor(workspaceModel: WorkspaceModel) {
    this.model = workspaceModel;
  }

  public async add(workspace: Workspace): Promise<Workspace> {
    try {
      const doc = await this.model.create(
        MongoWorkspaceMapper.toDatabase(workspace)
      );
      return MongoWorkspaceMapper.toEntity(doc);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async find(id: string): Promise<Workspace> {
    try {
      const doc = await this.model.findOne({ _id: id });
      if (!doc) {
        throw new Error("The specified workspace record is not found");
      }
      return MongoWorkspaceMapper.toEntity(doc);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async fetchAll(): Promise<WorkspaceInterface[]> {
    const matchTransformation = { $match: { deleted: false } };
    const groupTransformation = {
      $group: {
        _id: "$parent",
        entry: { $push: { parent: "$parent", name: "$name", id: "$_id" } }
      }
    };
    return this.model.aggregate([matchTransformation, groupTransformation]);
  }

  public async delete(id: string, user: ILoggedInUser) {
    try {
      const result = await this.model.updateOne(
        { _id: id },
        { $set: { deleted: true, lastUpdatedBy: user } }
      );
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw new Error(
          `Error deleting workspace: ${result.nModified} deleted `
        );
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }
}
