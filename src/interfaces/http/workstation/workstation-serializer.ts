import { Workstation } from "../../../domain";

export const WorkStationSerializer = {
  serialize(response: Workstation) {
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
