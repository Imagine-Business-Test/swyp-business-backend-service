import { WorkspaceRepository } from "../../contracts/repositories";
import { MongoWorkspaceMapper } from "./mongo-workspace-mapper";
import { LoggedInUser } from "../../contracts/interfaces";
import { Workspace } from "../../domain";
import {
  WorkspaceInterface,
  WorkspaceModel
} from "../../contracts/infra";

export class MongoWorkspaceRepository implements WorkspaceRepository {
  private model: WorkspaceModel;

  constructor(workspaceModel: WorkspaceModel) {
    this.model = workspaceModel;
  }

  async add(workspace: Workspace): Promise<Workspace> {
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

  async find(id: string): Promise<Workspace> {
    try {
      const doc = await this.model.findOne({ _id: id});
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

  async findByBusiness(businessId: string): Promise<WorkspaceInterface[]> {
    return this.model.find({ business: businessId, deleted: false });
  }

  async delete(id: string, user: LoggedInUser) {
    try {
      const result = await this.model.updateOne({ _id: id },
        { $set: { deleted: true, lastUpdatedBy: user }});
        if (result.nModified !== 1 || result.nMatched === 1) {
          throw  new Error(`Error deleting workspace: ${result.nModified } deleted `);
        }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

}


