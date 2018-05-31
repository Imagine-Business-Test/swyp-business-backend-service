import { WorkstationInterface } from "../../contracts/infra";
import { Workstation } from "../../domain";

export const MongoWorkStationMapper = {
  toEntity(doc: WorkstationInterface): Workstation {
    const {
      _id, name, business, createdBy, lastUpdatedBy, deleted, createdAt, updatedAt
    } = doc;
    return new Workstation(name, business, createdBy, lastUpdatedBy, deleted, _id, createdAt, updatedAt);
  },

  toDatabase(workStation: Workstation) {
    return {
      lastUpdatedBy: workStation.getLastModifier(),
      createdBy    : workStation.getCreator(),
      business     : workStation.getBusinessId(),
      name         : workStation.getName(),
    };
  }
};
