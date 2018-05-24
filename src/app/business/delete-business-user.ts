import { Operation } from "../operation";
import { BusinessRepositoryInterface } from "../../contracts/repositories/business";

export class DeleteBusinessUser extends Operation {
  private businessRepository: BusinessRepositoryInterface;

  constructor(businessRepo: BusinessRepositoryInterface) {
    super();
    this.businessRepository = businessRepo;
  }

  async execute(command: { email: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR, OPERATION_ERROR } = this.outputs;
    // test to see what happens when a deleted account is deleted again
    try {
      const result = await this.businessRepository.deleteAccount(command.email);
      if (result.nModified !== 1 && result.nMatched === 1) {
        throw  new Error("OperationError");
      }
      this.emit(SUCCESS, { deleted: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      if (ex.message === "OperationError") {
        ex.details = "Unable to delete account";
        this.emit(OPERATION_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

DeleteBusinessUser.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR", "OPERATION_ERROR"]);
