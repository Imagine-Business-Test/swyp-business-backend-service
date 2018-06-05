import { LoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";
import {
  WorkstationRepository,
  BusinessRepository
} from "../../contracts/repositories";

export class CreateWorkstation extends Operation {
  private businessRepository: BusinessRepository;
  private workStationRepository: WorkstationRepository;

  constructor(
    workstationRepository: WorkstationRepository,
    businessRepository: BusinessRepository) {
    super();
    this.workStationRepository = workstationRepository;
    this.businessRepository    = businessRepository;
  }

  async execute(command: { businessId: string, name: string, user: LoggedInUser }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { name, user } = command;

      const business    = await this.businessRepository.findByAccountEmail(user.email);
      const workStation = await this.workStationRepository.add(
        business.createWorkStation(name)
      );

    return this.emit(SUCCESS, workStation);
    } catch (ex) {
      if (ex.message === "DatabaseError") {
       return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

CreateWorkstation.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
