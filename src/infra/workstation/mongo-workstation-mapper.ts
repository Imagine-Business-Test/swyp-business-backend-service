import { WorkStationInterface } from "../../contracts/infra";
import { WorkStation } from "../../domain";

export const MongoWorkStationMapper = {
  toEntity(doc: WorkStationInterface): WorkStation {
    const {
      _id, name, business, createdBy, lastUpdatedBy, deleted, createdAt, updatedAt
    } = doc;
    return new WorkStation(name, business, createdBy, lastUpdatedBy, deleted, _id, createdAt, updatedAt);
  },

  toDatabase(workStation: WorkStation) {
    return {
      lastUpdatedBy: workStation.lastUpdatedBy,
      createdBy    : workStation.createdBy,
      business     : workStation.business,
      name         : workStation.name,
    };
  }
};
