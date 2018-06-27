import { WorkspaceRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetBusinessWorkspaces extends Operation {
  private workspaceRepository: WorkspaceRepository;

  constructor(workspaceRepository: WorkspaceRepository) {
    super();
    this.workspaceRepository = workspaceRepository;
  }

  async execute(command: { business: string }) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const workspaces = await this.workspaceRepository.findByBusiness(command.business);

      this.emit(SUCCESS, workspaces);
    } catch (ex) {
      this.emit(ERROR, ex);
    }
  }
}

GetBusinessWorkspaces.setOutputs(["SUCCESS", "ERROR"]);
