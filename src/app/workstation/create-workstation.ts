import { LoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";
import {
  WorkstationRepository,
  BusinessRepository
} from "../../contracts/repositories";


export class CreateWorkStation extends Operation {
  private businessRepository: BusinessRepository;
  private workStationRepository: WorkstationRepository;

  constructor(
    workStationRepo: WorkstationRepository,
    businessRepo: BusinessRepository) {
    super();
    this.workStationRepository = workStationRepo;
    this.businessRepository    = businessRepo;
  }

  async execute(command: { businessId: string, name: string, user: LoggedInUser }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { name, user } = command;

      const business    = await this.businessRepository.findByAccountEmail(user.email);
      const workStation = await this.workStationRepository.add(
        business.createWorkStation(name)
      );

    this.emit(SUCCESS, workStation);
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

CreateWorkStation.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
