import { IBusinessRepository } from "../../contracts/repositories";
import { ILoggedInUser } from "../../contracts/interfaces";
import { IBranch } from "../../contracts/domain";
import { Operation } from "../operation";
// import { Mailer } from "../../services";
// import uuid4 from "uuid/v4";

export class AddBusinessBranch extends Operation {
  private businessRepository: IBusinessRepository;
  // private mailer: Mailer;

  constructor(businessRepository: IBusinessRepository) {
    super();
    this.businessRepository = businessRepository;
    // this.mailer = mailer;
  }

  public async execute(command: {
    businessId: string;
    branch: IBranch;
    origin: string;
    user: ILoggedInUser;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { businessId, branch } = command;
      // const urlToken = uuid4();

      const business = await this.businessRepository.addBranch(
        businessId,
        branch
      );
      // const user = business.getUser();

      // const link = command.origin + `?token=${urlToken}`;

      // new account created event
      // this.mailer.welcome(user.name, command.user.name, user.email, link);

      return this.emit(SUCCESS, { business });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

AddBusinessBranch.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
