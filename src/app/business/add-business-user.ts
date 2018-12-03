import { IBusinessRepository } from "../../contracts/repositories";
import { ILoggedInUser } from "../../contracts/interfaces";
import { IAccount } from "../../contracts/domain";
import { Operation } from "../operation";
import { Mailer } from "../../services";
import uuid4 from "uuid/v4";

export class AddBusinessUser extends Operation {
  private businessRepository: IBusinessRepository;
  private mailer: Mailer;

  constructor(businessRepository: IBusinessRepository, mailer: Mailer) {
    super();
    this.businessRepository = businessRepository;
    this.mailer = mailer;
  }

  public async execute(command: {
    businessId: string;
    account: IAccount;
    origin: string;
    user: ILoggedInUser;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { businessId, account } = command;
      const urlToken = uuid4();

      const business = await this.businessRepository.addAccount(
        businessId,
        account
      );
      const user = business.getUser();

      const link = command.origin + `?token=${urlToken}`;

      // new account created event
      this.mailer.welcome(
        user.name,
        command.user.name,
        business.getName(),
        user.email,
        link
      );

      return this.emit(SUCCESS, { business });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

AddBusinessUser.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
