import { BusinessRepository } from "../../contracts/repositories";
import { Operation } from "../operation";
import { Mailer } from "../../services";

import uuid4 from "uuid/v4";

export class RequestPasswordReset extends Operation {
  private businessRepository: BusinessRepository;
  private mailer: Mailer;

  constructor(businessRepository: BusinessRepository, mailer: Mailer) {
    super();
    this.businessRepository = businessRepository;
    this.mailer = mailer;
  }

  async execute(command: { email: string, origin: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const token = uuid4();
      const expires = new Date();
      expires.setHours(2);
      await this.businessRepository.requestPasswordReset(command.email, token, expires);
      const business = await this.businessRepository.findByAccountEmail(command.email);
      const user     = business.getUser();
      const link     = command.origin + `?token=${token}`;

      this.mailer.sendPasswordRequest(user.name, user.email, link);
      this.emit(SUCCESS, {message: "check your mail for a reset password link "});
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

RequestPasswordReset.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
