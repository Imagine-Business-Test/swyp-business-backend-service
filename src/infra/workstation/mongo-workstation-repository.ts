import { WorkstationRepository } from "../../contracts/repositories";
import { MongoWorkStationMapper } from "./mongo-workstation-mapper";
import { LoggedInUser } from "../../contracts/interfaces";
import { WorkStation } from "../../domain";
import {
  WorkStationInterface,
  WorkStationModel,
  UpdateResult
} from "../../contracts/infra";

export class MongoWorkStationRepository implements WorkstationRepository {
  private model: WorkStationModel;

  constructor(model: WorkStationModel) {
    this.model = model;
  }

  async add(workStation: WorkStation): Promise<WorkStation> {
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

  async find(id: string): Promise<WorkStation> {
    try {
      const doc = await this.model.findOne({ _id: id});
      if (!doc) {
        throw new Error("NotFound");
      }
      return MongoWorkStationMapper.toEntity(doc);
    } catch (ex) {
      ex.details = "The specified workstation record is not found";
      throw ex;
    }
  }

  async delete(id: string, user: LoggedInUser): Promise<UpdateResult> {
    try {
      const result = await this.model.updateOne({ _id: id },
        { $set: { deleted: true, lastUpdatedBy: user }});
      return result;
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async findByBusiness(businessId: string): Promise<WorkStationInterface[]> {
    return this.model.find({ business: businessId});
  }
}


