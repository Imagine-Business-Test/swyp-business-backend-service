import { WorkStationInterface } from "../infra";
import { LoggedInUser } from "../interfaces";
import { WorkStation } from "../../domain";

export interface WorkstationRepository {
  add: (workStation: WorkStation) => Promise<WorkStation>;
  delete: (id: string, user: LoggedInUser) => void;
  find: (id: string) => Promise<WorkStation>;
  findByBusiness: (businessId: string) => Promise<WorkStationInterface[]>;
}
