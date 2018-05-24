import { WorkStation } from "../../domain";
import { UpdateResult } from "../infra";

export interface WorkStationRepositoryInterface {
  add: (workStation: WorkStation) => Promise<WorkStation>;
  delete: (workStation: WorkStation) => Promise<UpdateResult>;
}
