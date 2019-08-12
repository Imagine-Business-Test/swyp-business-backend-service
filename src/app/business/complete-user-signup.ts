import bcrypt from "bcrypt";
import { Mailer } from "../../services";
// import jwt from "jsonwebtoken";
// import { IConfig } from "../../contracts/config";
import { IBusinessRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class CompleteUserSignup extends Operation {
  private businessRepository: IBusinessRepository;
  private mailer: Mailer;
  // private config: IConfig;

  constructor(businessRepository: IBusinessRepository, mailer: Mailer) {
    super();
    this.businessRepository = businessRepository;
    this.mailer = mailer;
    // this.config = config;
  }

  // isTokenValid(tokenDate: Date){ //udor addendum
  //      return (new Date > tokenDate) ?  false : true
  // }

  public async execute(data: {
    token: string;
    email?: string;
    password?: string;
  }) {
    const token: string = data.token;
    const {
      SUCCESS,
      ERROR,
      DATABASE_ERROR,
      AUTHENTICATION_ERROR,
      INCOMPLETE_SETUP
    } = this.outputs;

    try {
      const business = await this.businessRepository.findByPasswordResetToken(
        token
      );

      const user = business.getUser();

      //for it to get here it means the token is valid so check if there is a body in
      // this request and create a password for this user

      const { email, password } = data;

      if (email && password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.businessRepository.updatePassword(
          user.email,
          hashedPassword
        );

        this.mailer.sendPasswordChanged(user.name, user.email);

        return this.emit(SUCCESS, { updated: true });
      }
      // const tokenValid = this.isTokenValid(user.passwordResetExpires as Date);

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

CompleteUserSignup.setOutputs([
  "SUCCESS",
  "ERROR",
  "DATABASE_ERROR",
  "AUTHENTICATION_ERROR",
  "INCOMPLETE_SETUP"
]);
