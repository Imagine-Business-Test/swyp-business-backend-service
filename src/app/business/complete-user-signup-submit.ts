// import bycrpt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { IConfig } from "../../contracts/config";
import { IBusinessRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class CompleteUserSignupSubmit extends Operation {
  private businessRepository: IBusinessRepository;
  // private config: IConfig;

  constructor(businessRepository: IBusinessRepository) {
    super();
    this.businessRepository = businessRepository;
    // this.config = config;
  }

  public async execute(data: { token: string }) {
    const token: string = data.token;
    const {
      SUCCESS,
      ERROR,
      DATABASE_ERROR,
      AUTHENTICATION_ERROR,
      INCOMPLETE_SETUP
    } = this.outputs;
    // return this.emit(SUCCESS, { token });
    try {
      const business = await this.businessRepository.findByPasswordResetToken(
        token
      );

      const user = business.getUser();

      return this.emit(SUCCESS, { user, token });
      if (!user.password) {
        throw new Error("IncompleteSetup");
      }
      // const result = await bycrpt.compare(command.password, user.password!);

      // if (!result) {
      //   throw new Error("AuthenticationError");
      // }

      // const token = jwt.sign(
      //   {
      //     branch: user.branch,
      //     email: user.email,
      //     isBusiness: true,
      //     name: user.name,
      //     role: user.role
      //   },
      //   this.config.web.json_secret,
      //   { expiresIn: "24h" }
      // );

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

CompleteUserSignupSubmit.setOutputs([
  "SUCCESS",
  "ERROR",
  "DATABASE_ERROR",
  "AUTHENTICATION_ERROR",
  "INCOMPLETE_SETUP"
]);
