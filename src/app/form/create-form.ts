import { FormRepository, WorkspaceRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";

export class CreateForm extends Operation {
  private formRepository: FormRepository;
  private workspaceRepository: WorkspaceRepository;

  constructor(formRepository: FormRepository, workspaceRepository: WorkspaceRepository) {
    super();
    this.workspaceRepository = workspaceRepository;
    this.formRepository        = formRepository;
  }

  async execute(
    command: { workspace: string, name: string, content: string, user: LoggedInUser}
  ) {

    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    try {
      const { workspace, name, content, user } = command;

      const workspaceRecord = await this.workspaceRepository.find(workspace);
      const form        = await this.formRepository.add(
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
