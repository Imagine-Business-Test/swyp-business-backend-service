import { WorkspaceInterface } from "../infra";
import { LoggedInUser } from "../interfaces";
import { Workspace } from "../../domain";

export interface WorkspaceRepository {
  add: (workspace: Workspace) => Promise<Workspace>;
  delete: (id: string, user: LoggedInUser) => void;
  find: (id: string) => Promise<Workspace>;
  findByBusiness: (businessId: string) => Promise<WorkspaceInterface[]>;
}
