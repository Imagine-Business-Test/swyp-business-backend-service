import { IAccount } from "../../contracts/domain";
import { BusinessInterface, BusinessModel } from "../../contracts/infra";
import { ILoggedInUser } from "../../contracts/interfaces";
import { IBusinessRepository } from "../../contracts/repositories";
import { Business } from "../../domain";
import { MongoBusinessMapper } from "./mongo-business-mapper";

export class MongoBusinessRepository implements IBusinessRepository {
  private model: BusinessModel;

  constructor(businessModel: BusinessModel) {
    this.model = businessModel;
  }

  public async add(business: Business): Promise<Business> {
    try {
      const data = MongoBusinessMapper.toDatabase(business);
      const doc: BusinessInterface = await this.model.create(data);
      return MongoBusinessMapper.toEntity(doc, doc.accounts[0]);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async addAccount(
    businessId: string,
    account: IAccount
  ): Promise<Business> {
    try {
      let doc = await this.model.findOne({ "accounts.email": account.email });
      if (doc) {
        throw new Error(`Account with the provided email already exist`);
      }

      doc = await this.model.findByIdAndUpdate(
        businessId,
        { $addToSet: { accounts: account } },
        { new: true }
      );

      if (!doc) {
        throw new Error(`Account not found`);
      }
      return MongoBusinessMapper.toEntity(doc, account);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async findByAccountEmail(email: string): Promise<Business> {
    try {
      const doc = await this.model.findOne({ "accounts.email": email });

      if (!doc) {
        throw new Error(`Account not found`);
      }

      const currentUser = this.processCurrentUser(doc.accounts, email);

      await this.updateLastLogin(currentUser);
      return MongoBusinessMapper.toEntity(doc, currentUser);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async findByPasswordResetToken(
    email: string,
    token: string
  ): Promise<Business> {
    const doc = await this.model.findOne({
      "accounts.email": email,
      "accounts.passwordResetToken": token
    });
    if (!doc) {
      throw new Error(`Account not found`);
    }

    const currentUser = this.processCurrentUser(doc.accounts, email);

    return MongoBusinessMapper.toEntity(doc, currentUser);
  }

  public async requestPasswordReset(
    email: string,
    token: string,
    expires: Date
  ) {
    try {
      const result = await this.model.updateOne(
        {},
        {
          $set: {
            "accounts.$[elem].passwordResetExpires": expires,
            "accounts.$[elem].passwordResetToken": token
          }
        },
        { arrayFilters: [{ "elem.email": email }] }
      );
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw new Error(`Error updating account: ${result.nModified} updated `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async updatePassword(email: string, password: string) {
    try {
      const result = await this.model.updateOne(
        {},
        {
          $set: {
            "accounts.$[elem].password": password,
            "accounts.$[elem].passwordResetExpires": null,
            "accounts.$[elem].passwordResetToken": null
          }
        },
        { arrayFilters: [{ "elem.email": email }] }
      );
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw new Error(`Error updating account: ${result.nModified} updated `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async deleteAccount(email: string, modifer: ILoggedInUser) {
    try {
      const result = await this.model.updateOne(
        {},
        {
          $set: {
            "accounts.$[elem].deleted": true,
            "accounts.$[elem].deletedBy": modifer
          }
        },
        { arrayFilters: [{ "elem.email": email }] }
      );
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw new Error(`Error deleting account: ${result.nModified} deleted `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  private processCurrentUser(users: IAccount[], email: string): IAccount {
    const currentUser = users.find(account => {
      return account.email === email;
    }) as IAccount;

    if (currentUser.deleted) {
      throw new Error("Account disabled");
    }
    return currentUser;
  }

  private async updateLastLogin(user: IAccount) {
    return this.model.updateOne(
      {},
      { $set: { "accounts.$[element].lastLogIn": new Date() } },
      { arrayFilters: [{ "element.email": user.email }] }
    );
  }
}
