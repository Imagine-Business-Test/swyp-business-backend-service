import { WorkspaceInterface } from "../../contracts/infra";
import { Workspace } from "../../domain";

export const MongoWorkspaceMapper = {
  toEntity(doc: WorkspaceInterface): Workspace {
    const {
      _id, name, business, creator, lastModifier, deleted, createdAt, updatedAt
    } = doc;
    return new Workspace(name, business, creator, lastModifier, deleted, _id, createdAt, updatedAt);
  },

  toDatabase(workspace: Workspace) {
    return {
      lastModifier: workspace.getLastModifier(),
      creator    : workspace.getCreator(),
      business     : workspace.getBusinessId(),
      name         : workspace.getName(),
    };
  }
};
