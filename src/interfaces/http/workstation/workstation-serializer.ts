import { WorkstationInterface } from "../../../contracts/infra";
import { Workstation } from "../../../domain";

export const WorkStationSerializer = {
  serialize(response: WorkstationInterface[] | Workstation ) {
    if (Array.isArray(response)) {
      return response.map(workstation => {
        return {
          lastModifier: workstation.lastModifier,
          updatedAt: workstation.updatedAt,
          createdAt: workstation.createdAt,
          business: workstation.business,
          creator: workstation.creator,
          name: workstation.name,
          _id: workstation._id
        };
      });
    }
    return {
      lastModifier: response.getLastModifier(),
      updatedAt: response.getLastUpdateDate(),
      createdAt: response.getCreationDate(),
      business: response.getBusinessId(),
      creator: response.getCreator(),
      name: response.getName(),
      _id: response.getId()
    };
  }
};
