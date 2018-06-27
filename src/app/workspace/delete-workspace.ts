import { Operation } from "../operation";
import { WorkspaceRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";

export class DeleteWorkspace extends Operation {
  private workspaceRepository: WorkspaceRepository;

  constructor(workspaceRepository: WorkspaceRepository) {
    super();
    this.workspaceRepository = workspaceRepository;
  }


  async execute(command: { workspace: string, user: LoggedInUser}) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { workspace, user } = command;
      await this.workspaceRepository.delete(workspace, user);

      this.emit(SUCCESS, { deleted: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

DeleteWorkspace.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
