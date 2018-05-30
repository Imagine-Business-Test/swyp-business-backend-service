import { WorkstationRepository } from "../../contracts/repositories";
import { MongoWorkStationMapper } from "./mongo-workstation-mapper";
import { LoggedInUser } from "../../contracts/interfaces";
import { Workstation } from "../../domain";
import {
  WorkstationInterface,
  WorkstationModel
} from "../../contracts/infra";

export class MongoWorkStationRepository implements WorkstationRepository {
  private model: WorkstationModel;

  constructor(model: WorkstationModel) {
    this.model = model;
  }

  async add(workStation: Workstation): Promise<Workstation> {
    try {
      const doc = await this.model.create(
        MongoWorkStationMapper.toDatabase(workStation)
      );
      return MongoWorkStationMapper.toEntity(doc);
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
      return MongoWorkStationMapper.toEntity(doc);
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
        if (result.nModified !== 1 && result.nMatched === 1) {
          throw  new Error(`Error deleting workstation: ${result.nModified } affected `);
        }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

}


