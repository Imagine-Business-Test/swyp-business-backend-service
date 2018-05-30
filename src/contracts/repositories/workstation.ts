import { WorkstationInterface } from "../infra";
import { LoggedInUser } from "../interfaces";
import { Workstation } from "../../domain";

export interface WorkstationRepository {
  add: (workStation: Workstation) => Promise<Workstation>;
  delete: (id: string, user: LoggedInUser) => void;
  find: (id: string) => Promise<Workstation>;
  findByBusiness: (businessId: string) => Promise<WorkstationInterface[]>;
}
