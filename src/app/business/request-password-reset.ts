/* tslint:disable: no-submodule-imports */
import { IBusinessRepository } from "../../contracts/repositories";
import { Mailer } from "../../services";
import { Operation } from "../operation";

import uuid4 from "uuid/v4";

export class RequestPasswordReset extends Operation {
  private businessRepository: IBusinessRepository;
  private mailer: Mailer;

  constructor(businessRepository: IBusinessRepository, mailer: Mailer) {
    super();
    this.businessRepository = businessRepository;
    this.mailer = mailer;
  }

  public async execute(command: { email: string; origin: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const token = uuid4();
      const expires = new Date();
      expires.setHours(2);
      await this.businessRepository.requestPasswordReset(
        command.email,
        token,
        expires
      );
      const business = await this.businessRepository.findByAccountEmail(
        command.email
      );
      const user = business.getUser();
      const link = command.origin + `?token=${token}`;

      this.mailer.sendPasswordRequest(user.name, user.email, link);
      return this.emit(SUCCESS, {
        message: "check your mail for a reset password link "
      });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

RequestPasswordReset.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
