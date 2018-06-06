import { BusinessRepository } from "../../contracts/repositories";
import { Account } from "../../contracts/domain";
import { Config } from "../../contracts/config";
import { Operation } from "../operation";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AddBusinessUser extends Operation {

  private businessRepository: BusinessRepository;
  private config: Config;

  constructor(businessRepository: BusinessRepository, config: Config) {
    super();
    this.businessRepository = businessRepository;
    this.config             = config;
  }

  async execute(command: { businessId: string, account: Account}) {

    const {SUCCESS, ERROR, DATABASE_ERROR} = this.outputs;

    try {
      const { businessId, account }  = command;
      account.password       = await bcrypt.hash(account.password, 10);

      const business = await this.businessRepository.addAccount(businessId, account);
      const user     = business.getUser();
      const token = jwt.sign({
        email: user.email,
        name: user.name,
        isBusiness: true
      }, this.config.web.json_secret, {expiresIn: "24h"});

      // new account created event

      return this.emit(SUCCESS, { business, user, token });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

AddBusinessUser.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);


