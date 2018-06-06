import { BusinessRepository } from "../../contracts/repositories";
import { Account } from "../../contracts/domain";
import { Config } from "../../contracts/config";
import { Operation } from "../operation";
import { Business } from "../../domain";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export class CreateBusiness extends Operation {
  private businessRepository: BusinessRepository;
  private config: Config;

  constructor(businessRepository: BusinessRepository, config: Config) {
    super();
    this.businessRepository = businessRepository;
    this.config             = config;
  }


  async execute(command: {name: string, logoUrl: string, account: Account }) {

    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    try {
      const { name, logoUrl, account } = command;

      const newBusiness    = new Business(name, logoUrl, []);
      const savedBusiness  = await this.businessRepository.add(newBusiness);
      account.password     = await bcrypt.hash(account.password, 10);

      const business = await this.businessRepository.addAccount(savedBusiness.getId()!, account);
      const user     = business.getUser();
      const token    = jwt.sign({
        email: user.email,
        name: user.name,
        isBusiness: true
      }, this.config.web.json_secret, {expiresIn: "24h"});

      return this.emit(SUCCESS, { business, user, token });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

CreateBusiness.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
