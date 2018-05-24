import { WorkStation } from "../../domain";
import { UpdateResult } from "../infra";
import { LoggedInUser } from "../interfaces";

export interface WorkStationRepositoryInterface {
  add: (workStation: WorkStation) => Promise<WorkStation>;
  delete: (id: string, user: LoggedInUser) => Promise<UpdateResult>;
}
