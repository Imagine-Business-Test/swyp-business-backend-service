import { WorkspaceInterface, WorkspaceModel } from "../../contracts/infra";
import { ILoggedInUser } from "../../contracts/interfaces";
import { IWorkspaceRepository } from "../../contracts/repositories";
import { Workspace } from "../../domain";
import { MongoWorkspaceMapper } from "./mongo-workspace-mapper";

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

  public async findByBusiness(
    businessId: string
  ): Promise<WorkspaceInterface[]> {
    return this.model.find({ business: businessId, deleted: false });
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
