import { BusinessRepositoryInterface } from "../../contracts/repositories/business";
import { Account } from "../../contracts/domain";
import { Operation } from "../operation";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Config } from "../../contracts/config";

export class AddBusinessAccount extends Operation {

  private businessRepository: BusinessRepositoryInterface;
  private config: Config;

  constructor(businessRepository: BusinessRepositoryInterface, config: Config) {
    super();
    this.businessRepository = businessRepository;
    this.config             = config;
  }

  async execute(command: { businessId: string, account: Account}) {

    const {SUCCESS, ERROR, DATABASE_ERROR} = this.outputs;
    try {
      command.account.password = await bcrypt.hash(command.account.password, 10);
      const { businessId, account } = command;
      const business = await this.businessRepository.addAccount(businessId, account);
      const user = business.getCurrentUser();

      const token = jwt.sign({
        email: user.email,
        name: user.name
      }, this.config.web.json_secret);

      // new account created event

      this.emit(SUCCESS, { business, token });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

AddBusinessAccount.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);


