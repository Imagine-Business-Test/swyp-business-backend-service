import { IBusinessRepository } from "../../contracts/repositories";
import { ILoggedInUser } from "../../contracts/interfaces";
import { IBranch } from "../../contracts/domain";
import { Operation } from "../operation";

export class UpdateBranchDetails extends Operation {
  private model: IBusinessRepository;
  constructor(businessRepository: IBusinessRepository) {
    super();
    this.model = businessRepository;
  }

  public async execute(command: {
    businessId: string;
    branch: IBranch;
    origin: string;
    user: ILoggedInUser;
    branchId: string;
  }) {
    console.log("exec");
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    console.log("origin", command.origin);
    try {
      await this.model.updateBranch(command.branchId, command.branch);
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

UpdateBranchDetails.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
