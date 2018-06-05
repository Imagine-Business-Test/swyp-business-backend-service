import { WorkstationInterface } from "../../contracts/infra";
import { Workstation } from "../../domain";

export const MongoWorkstationMapper = {
  toEntity(doc: WorkstationInterface): Workstation {
    const {
      _id, name, business, creator, lastModifier, deleted, createdAt, updatedAt
    } = doc;
    return new Workstation(name, business, creator, lastModifier, deleted, _id, createdAt, updatedAt);
  },

  toDatabase(workStation: Workstation) {
    return {
      lastModifier: workStation.getLastModifier(),
      creator    : workStation.getCreator(),
      business     : workStation.getBusinessId(),
      name         : workStation.getName(),
    };
  }
};
