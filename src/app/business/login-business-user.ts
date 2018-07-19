import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import { IConfig } from "../../contracts/config";
import { IBusinessRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class LoginBusinessUser extends Operation {
  private businessRepository: IBusinessRepository;
  private config: IConfig;

  constructor(businessRepository: IBusinessRepository, config: IConfig) {
    super();
    this.businessRepository = businessRepository;
    this.config = config;
  }

  public async execute(command: { email: string; password: string }) {
    const {
      SUCCESS,
      ERROR,
      DATABASE_ERROR,
      AUTHENTICATION_ERROR,
      INCOMPLETE_SETUP
    } = this.outputs;

    try {
      const business = await this.businessRepository.findByAccountEmail(
        command.email
      );
      const user = business.getUser();
      if (!user.password) {
        throw new Error("IncompleteSetup");
      }
      const result = await bycrpt.compare(command.password, user.password!);

      if (!result) {
        throw new Error("AuthenticationError");
      }

      const token = jwt.sign(
        {
          email: user.email,
          isBusiness: true,
          name: user.name,
          role: user.role
        },
        this.config.web.json_secret,
        { expiresIn: "24h" }
      );

      return this.emit(SUCCESS, { user, token, business });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      if (ex.message === "AuthenticationError") {
        return this.emit(AUTHENTICATION_ERROR, ex);
      }
      if (ex.message === "IncompleteSetup") {
        return this.emit(INCOMPLETE_SETUP, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

LoginBusinessUser.setOutputs([
  "SUCCESS",
  "ERROR",
  "DATABASE_ERROR",
  "AUTHENTICATION_ERROR",
  "INCOMPLETE_SETUP"
]);
