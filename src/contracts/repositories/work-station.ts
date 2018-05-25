import { WorkStation } from "../../domain";
import { UpdateResult, WorkStationInterface } from "../infra";
import { LoggedInUser } from "../interfaces";

export interface WorkstationRepository {
  add: (workStation: WorkStation) => Promise<WorkStation>;
  delete: (id: string, user: LoggedInUser) => Promise<UpdateResult>;
  find: (id: string) => Promise<WorkStation>;
  findByBusiness: (businessId: string) => Promise<WorkStationInterface[]>;
}
