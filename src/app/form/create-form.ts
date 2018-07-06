import { ILoggedInUser } from "../../contracts/interfaces";
import {
  IFormRepository,
  IWorkspaceRepository
} from "../../contracts/repositories";
import { Operation } from "../operation";

export class CreateForm extends Operation {
  private formRepository: IFormRepository;
  private workspaceRepository: IWorkspaceRepository;

  constructor(
    formRepository: IFormRepository,
    workspaceRepository: IWorkspaceRepository
  ) {
    super();
    this.workspaceRepository = workspaceRepository;
    this.formRepository = formRepository;
  }

  public async execute(command: {
    workspace: string;
    name: string;
    content: string;
    user: ILoggedInUser;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    try {
      const { workspace, name, content, user } = command;

      const workspaceRecord = await this.workspaceRepository.find(workspace);
      const form = await this.formRepository.add(
        workspaceRecord.createForm(name, content, user)
      );

      return this.emit(SUCCESS, form);
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

CreateForm.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
