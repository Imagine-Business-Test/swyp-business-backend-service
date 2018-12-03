import { IBusinessRepository } from "../../contracts/repositories";
import { ILoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";

export class UpdateUserBranch extends Operation {
  private model: IBusinessRepository;
  constructor(businessRepository: IBusinessRepository) {
    super();
    this.model = businessRepository;
  }

  public async execute(command: {
    userId: string;
    newBranch: string;
    user: ILoggedInUser;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      await this.model.updateBranch(command.userId, command.newBranch);
      const business = await this.model.findByAccountEmail(command.user.email);
      return this.emit(SUCCESS, { business });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

UpdateUserBranch.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
