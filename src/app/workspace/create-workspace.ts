import { ILoggedInUser } from "../../contracts/interfaces";
import {
  IBusinessRepository,
  IWorkspaceRepository
} from "../../contracts/repositories";
import { Operation } from "../operation";

export class CreateWorkspace extends Operation {
  private businessRepository: IBusinessRepository;
  private workspaceRepository: IWorkspaceRepository;

  constructor(
    workspaceRepository: IWorkspaceRepository,
    businessRepository: IBusinessRepository
  ) {
    super();
    this.workspaceRepository = workspaceRepository;
    this.businessRepository = businessRepository;
  }

  public async execute(command: {
    businessId: string;
    name: string;
    user: ILoggedInUser;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { name, user } = command;

      const business = await this.businessRepository.findByAccountEmail(
        user.email
      );
      const workspace = await this.workspaceRepository.add(
        business.createWorkspace(name)
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
