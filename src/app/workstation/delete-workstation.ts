import { Operation } from "../operation";
import { WorkstationRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";

export class DeleteWorkstation extends Operation {
  private workstationRepository: WorkstationRepository;

  constructor(workstationRepository: WorkstationRepository) {
    super();
    this.workstationRepository = workstationRepository;
  }

  async execute(command: { workstation: string, user: LoggedInUser}) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { workstation, user } = command;
      await this.workstationRepository.delete(workstation, user);

      this.emit(SUCCESS, { deleted: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

DeleteWorkstation.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
