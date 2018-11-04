import { WorkspaceInterface } from "../../contracts/infra";
import { Workspace } from "../../domain";

export const MongoWorkspaceMapper = {
  toEntity(doc: WorkspaceInterface): Workspace {
    const {
      _id,
      name,
      parent,
      creator,
      lastModifier,
      deleted,
      createdAt,
      updatedAt
    } = doc;
    return new Workspace(
      name,
      parent,
      creator,
      lastModifier,
      deleted,
      _id,
      createdAt,
      updatedAt
    );
  },

  toDatabase(workspace: Workspace) {
    return {
      lastModifier: workspace.getLastModifier(),
      creator: workspace.getCreator(),
      business: workspace.getParent(),
      name: workspace.getName()
    };
  }
};
