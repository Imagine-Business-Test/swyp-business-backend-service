import { WorkStationRepositoryInterface } from "../../contracts/repositories";
import { MongoWorkStationMapper } from "./mongo-workstation-mapper";
import { WorkStationModel, UpdateResult } from "../../contracts/infra";
import { WorkStation } from "../../domain";
import { LoggedInUser } from "../../contracts/interfaces";

export class MongoWorkStationRepository implements WorkStationRepositoryInterface {
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

  async delete(id: string, user: LoggedInUser): Promise<UpdateResult> {
    return this.model.updateOne({ _id: id },
    { $set: { deleted: true, lastUpdatedBy: user }});
  }
}
