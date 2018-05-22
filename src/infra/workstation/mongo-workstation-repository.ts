import { WorkStationModel } from "../../contracts/infra";
import { WorkStation } from "../../domain";
import { MongoWorkStationMapper } from "./mongo-workstation-mapper";

export class MongoWorkStationRepository {
  private model: WorkStationModel;

  constructor(model: WorkStationModel) {
    this.model = model;
  }

  async add(workStation: WorkStation) {
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

  async delete(workStation: WorkStation) {
    return this.model.updateOne({ _id: workStation._id },
    { $set: { deleted: workStation.deleted, lastUpdatedBy: workStation.lastUpdatedBy }});
  }
}
