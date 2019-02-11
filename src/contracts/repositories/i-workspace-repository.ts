import { Workspace } from "../../domain";
import { WorkspaceInterface } from "../infra";
import { ILoggedInUser } from "../interfaces";

export interface IWorkspaceRepository {
  add: (workspace: Workspace) => Promise<Workspace>;
  delete: (id: string, user: ILoggedInUser) => void;
  find: (id: string) => Promise<Workspace>;
  fetchAll: () => Promise<WorkspaceInterface[]>;
}
