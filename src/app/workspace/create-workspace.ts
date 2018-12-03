import { IWorkspaceRepository } from "../../contracts/repositories";
import { ILoggedInUser } from "../../contracts/interfaces";
import { Workspace } from "../../domain";
import { Operation } from "../operation";

export class CreateWorkspace extends Operation {
  private workspaceRepository: IWorkspaceRepository;

  constructor(workspaceRepository: IWorkspaceRepository) {
    super();
    this.workspaceRepository = workspaceRepository;
  }

  public async execute(command: {
    parent: string;
    name: string;
    user: ILoggedInUser;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { name, parent, user } = command;
      const workspace = await this.workspaceRepository.add(
        new Workspace(name, parent, user, user, false)
      );

      return this.emit(SUCCESS, workspace);
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

CreateWorkspace.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
