import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IConfig } from "../../contracts/config";
import { IAccount } from "../../contracts/domain";
import { IBusinessRepository } from "../../contracts/repositories";
import { Business } from "../../domain";
import { Operation } from "../operation";

export class CreateBusiness extends Operation {
  private businessRepository: IBusinessRepository;
  private config: IConfig;

  constructor(businessRepository: IBusinessRepository, config: IConfig) {
    super();
    this.businessRepository = businessRepository;
    this.config = config;
  }

  public async execute(command: {
    name: string;
    logoUrl: string;
    account: IAccount;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    try {
      const { name, logoUrl, account } = command;
      const slug = name.toLowerCase().replace(" ", "");
      const deleted = false;
      const approved = true;
      const newBusiness = new Business(
        name,
        slug,
        approved,
        deleted,
        [],
        logoUrl
      );
      const savedBusiness = await this.businessRepository.add(newBusiness);
      account.password = await bcrypt.hash(account.password, 10);

      const business = await this.businessRepository.addAccount(
        savedBusiness.getId()!,
        account
      );
      const user = business.getUser();

      // send welcome email

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
