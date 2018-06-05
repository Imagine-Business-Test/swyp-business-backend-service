import { BusinessRepository } from "../../contracts/repositories";
import { Operation } from "../operation";
import { Mailer } from "../../services";
import bcrypt from "bcrypt";


export class ResetPassword extends Operation {
  private businessRepository: BusinessRepository;
  private mailer: Mailer;

  constructor(businessRepository: BusinessRepository, mailer: Mailer) {
    super();
    this.businessRepository = businessRepository;
    this.mailer = mailer;
  }

  async execute(command: { email: string, password: string, token: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    const { email, token, password } = command;
    try {

      const business = await this.businessRepository.findByPasswordResetToken(email, token);
      const user = business.getUser();
      const hasdPassword = await bcrypt.hash(password, 10);
      await this.businessRepository.updatePassword(user.email, hasdPassword);

      this.mailer.sendPasswordChanged(user.name, user.email);

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
