import { ILoggedInUser } from "../../contracts/interfaces";
import { IWorkspaceRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class DeleteWorkspace extends Operation {
  private workspaceRepository: IWorkspaceRepository;

  constructor(workspaceRepository: IWorkspaceRepository) {
    super();
    this.workspaceRepository = workspaceRepository;
  }

  public async execute(command: { workspace: string; user: ILoggedInUser }) {
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
