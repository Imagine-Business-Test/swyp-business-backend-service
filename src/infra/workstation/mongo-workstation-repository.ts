import { WorkstationRepository } from "../../contracts/repositories";
import { MongoWorkstationMapper } from "./mongo-workstation-mapper";
import { LoggedInUser } from "../../contracts/interfaces";
import { Workstation } from "../../domain";
import {
  WorkstationInterface,
  WorkstationModel
} from "../../contracts/infra";

export class MongoWorkstationRepository implements WorkstationRepository {
  private model: WorkstationModel;

  constructor(workstationModel: WorkstationModel) {
    this.model = workstationModel;
  }

  async add(workStation: Workstation): Promise<Workstation> {
    try {
      const doc = await this.model.create(
        MongoWorkstationMapper.toDatabase(workStation)
      );
      return MongoWorkstationMapper.toEntity(doc);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async find(id: string): Promise<Workstation> {
    try {
      const doc = await this.model.findOne({ _id: id});
      if (!doc) {
        throw new Error("The specified workstation record is not found");
      }
      return MongoWorkstationMapper.toEntity(doc);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async findByBusiness(businessId: string): Promise<WorkstationInterface[]> {
    return this.model.find({ business: businessId, deleted: false });
  }

  async delete(id: string, user: LoggedInUser) {
    try {
      const result = await this.model.updateOne({ _id: id },
        { $set: { deleted: true, lastUpdatedBy: user }});
        if (result.nModified !== 1 || result.nMatched === 1) {
          throw  new Error(`Error deleting workstation: ${result.nModified } deleted `);
        }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

}


