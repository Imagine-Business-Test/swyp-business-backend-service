import { BusinessRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class DeleteBusinessUser extends Operation {
  private businessRepository: BusinessRepository;

  constructor(businessRepo: BusinessRepository) {
    super();
    this.businessRepository = businessRepo;
  }

  async execute(command: { email: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR} = this.outputs;
    // test to see what happens when a deleted account is deleted again
    try {
      await this.businessRepository.deleteAccount(command.email);

      this.emit(SUCCESS, { deleted: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

DeleteBusinessUser.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
