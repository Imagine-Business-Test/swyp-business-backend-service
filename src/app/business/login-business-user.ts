import { BusinessRepository } from "../../contracts/repositories";
import { Config } from "../../contracts/config";
import { Operation } from "../operation";
import jwt from "jsonwebtoken";
import bycrpt from "bcrypt";

class LoginBusinessUser extends Operation {
  private businessRepository: BusinessRepository;
  private config: Config;

  constructor(businessRepo: BusinessRepository, config: Config) {
    super();
    this.businessRepository = businessRepo;
    this.config             = config;
  }

  async execute(command: { email: string, password: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR, AUTHENTICATION_ERROR } = this.outputs;

    try {
      const business = await this.businessRepository.findByAccountEmail(command.email);
      const user     = business.getCurrentUser();
      const result    = await bycrpt.compare(command.password, user.password);

      if (!result) {
        throw new Error("AuthenticationError");
      }

      const token = jwt.sign({
        email: user.email,
        name: user.name
      }, this.config.web.json_secret);

      this.emit(SUCCESS, { user, token, business });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      if (ex.message === "AuthenticationError") {
        this.emit(AUTHENTICATION_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

LoginBusinessUser.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR", "AUTHENTICATION_ERROR"]);
