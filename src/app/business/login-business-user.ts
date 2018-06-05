import { BusinessRepository } from "../../contracts/repositories";
import { Config } from "../../contracts/config";
import { Operation } from "../operation";
import jwt from "jsonwebtoken";
import bycrpt from "bcrypt";

export class LoginBusinessUser extends Operation {
  private businessRepository: BusinessRepository;
  private config: Config;

  constructor(businessRepository: BusinessRepository, config: Config) {
    super();
    this.businessRepository = businessRepository;
    this.config             = config;
  }

  async execute(command: { email: string, password: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const business = await this.businessRepository.findByAccountEmail(command.email);
      const user     = business.getUser();
      const result   = await bycrpt.compare(command.password, user.password);

      if (!result) {
        throw new Error("AuthenticationError");
      }

      const token = jwt.sign({
        email: user.email,
        name: user.name,
        isBusiness: true
      }, this.config.web.json_secret, { expiresIn: "24h"});

      return this.emit(SUCCESS, { user, token, business });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

LoginBusinessUser.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
