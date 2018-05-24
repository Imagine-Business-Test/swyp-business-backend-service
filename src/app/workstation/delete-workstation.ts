import { Operation } from "../operation";
import { WorkStationRepositoryInterface } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";

export class DeleteWorkstation extends Operation {
  private workstationRepository: WorkStationRepositoryInterface;

  constructor(worksationRepo: WorkStationRepositoryInterface) {
    super();
    this.workstationRepository = worksationRepo;
  }

  async execute(command: { workstation: string, user: LoggedInUser}) {
    const { SUCCESS, ERROR, DATABASE_ERROR, OPERATION_ERROR } = this.outputs;

    try {
      const { workstation, user } = command;

      const result = await this.workstationRepository.delete(workstation, user);
      if (result.nModified !== 1 && result.nMatched === 1) {
        throw  new Error("OperationError");
      }
      this.emit(SUCCESS, { deleted: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      if (ex.message === "OperationError") {
        ex.details = "Unable to delete account";
        this.emit(OPERATION_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

DeleteWorkstation.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR", "OPERATION_ERROR"]);
