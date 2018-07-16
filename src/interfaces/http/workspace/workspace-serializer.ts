import { WorkspaceInterface } from "../../../contracts/infra";
import { Workspace } from "../../../domain";

export const WorkspaceSerializer = {
  serialize(response: WorkspaceInterface[] | Workspace) {
    if (Array.isArray(response)) {
      return response.map(workspace => {
        return {
          lastModifier: workspace.lastModifier,
          updatedAt: workspace.updatedAt,
          createdAt: workspace.createdAt,
          business: workspace.business,
          creator: workspace.creator,
          name: workspace.name,
          id: workspace._id
        };
      });
    }
    return {
      lastModifier: response.getLastModifier(),
      updatedAt: response.getLastUpdateDate(),
      createdAt: response.getCreationDate(),
      business: response.getBusiness(),
      creator: response.getCreator(),
      name: response.getName(),
      id: response.getId()
    };
  }
};
