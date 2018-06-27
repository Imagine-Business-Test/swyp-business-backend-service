import { LoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";
import {
  WorkspaceRepository,
  BusinessRepository
} from "../../contracts/repositories";

export class CreateWorkspace extends Operation {
  private businessRepository: BusinessRepository;
  private workspaceRepository: WorkspaceRepository;

  constructor(
    workspaceRepository: WorkspaceRepository,
    businessRepository: BusinessRepository) {
    super();
    this.workspaceRepository = workspaceRepository;
    this.businessRepository    = businessRepository;
  }

  async execute(command: { businessId: string, name: string, user: LoggedInUser }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { name, user } = command;

      const business    = await this.businessRepository.findByAccountEmail(user.email);
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
