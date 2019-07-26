import { ILoggedInUser } from "../../contracts/interfaces";
import { IBusinessRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class DeleteBusinessBranch extends Operation {
  private businessRepository: IBusinessRepository;

  constructor(businessRepository: IBusinessRepository) {
    super();
    this.businessRepository = businessRepository;
  }

  public async execute(command: { name: string; modifier: ILoggedInUser }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    // do not update record if already deleted
    try {
      await this.businessRepository.deleteBranch(
        command.name,
        command.modifier
      );

      return this.emit(SUCCESS, { deleted: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

DeleteBusinessBranch.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
