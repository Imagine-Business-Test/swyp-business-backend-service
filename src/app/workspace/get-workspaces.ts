import { IWorkspaceRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetWorkspaces extends Operation {
  private workspaceRepository: IWorkspaceRepository;

  constructor(workspaceRepository: IWorkspaceRepository) {
    super();
    this.workspaceRepository = workspaceRepository;
  }
  public async execute() {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const items = await this.workspaceRepository.fetchAll();
      const workspaces: any = {};
      items.forEach((item: any) => {
        if (!workspaces.hasOwnProperty(item._id)) {
          workspaces[item._id] = item.entry;
        }
      });
      this.emit(SUCCESS, workspaces);
    } catch (ex) {
      this.emit(ERROR, ex);
    }
  }
}

GetWorkspaces.setOutputs(["SUCCESS", "ERROR"]);
