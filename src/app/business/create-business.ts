import { IBusinessRepository } from "../../contracts/repositories";
import { IAccount } from "../../contracts/domain";
import { IConfig } from "../../contracts/config";
import { IBranch } from "../../contracts/infra";
import { Business } from "../../domain";
import { Operation } from "../operation";
import { Mailer } from "../../services";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class CreateBusiness extends Operation {
  private businessRepository: IBusinessRepository;
  private config: IConfig;
  private mailer: Mailer;

  constructor(
    businessRepository: IBusinessRepository,
    config: IConfig,
    mailer: Mailer
  ) {
    super();
    this.businessRepository = businessRepository;
    this.config = config;
    this.mailer = mailer;
  }

  public async execute(command: {
    name: string;
    logoUrl: string;
    account: IAccount;
    branches: IBranch[];
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    try {
      const { name, logoUrl, account, branches } = command;
      const slug = name.toLowerCase().replace(" ", "");
      const deleted = false;
      const approved = true;
      const newBusiness = new Business(
        name,
        slug,
        approved,
        deleted,
        [],
        branches,
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
      this.mailer.welcomeAdmin(business.getName(), user.name, user.email);
      const token = jwt.sign(
        {
          branch: user.branch,
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
