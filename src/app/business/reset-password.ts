import { BusinessRepository } from "../../contracts/repositories";
import { Operation } from "../operation";
import bcrypt from "bcrypt";

export class ResetPassword extends Operation {
  private businessRepository: BusinessRepository;

  constructor(businessRepo: BusinessRepository) {
    super();
    this.businessRepository = businessRepo;
  }

  async execute(command: { email: string, password: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const business = await this.businessRepository.findByAccountEmail(command.email);
      const user = business.getUser();
      const password = await bcrypt.hash(command.password, 10);
      await this.businessRepository.updatePassword(user.email, password);
      this.emit(SUCCESS, {updated: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

ResetPassword.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
