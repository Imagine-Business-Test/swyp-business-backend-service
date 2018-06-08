import { BusinessModel, BusinessInterface } from "../../contracts/infra";
import { BusinessRepository } from "../../contracts/repositories";
import { MongoBusinessMapper } from "./mongo-business-mapper";
import { LoggedInUser } from "../../contracts/interfaces";
import { Account } from "../../contracts/domain";
import { Business } from "../../domain";


export class MongoBusinessRepository implements BusinessRepository {
  private model: BusinessModel;

  constructor(businessModel: BusinessModel) {
    this.model = businessModel;
  }

  async add(business: Business): Promise<Business> {

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

  async addAccount(businessId: string, account: Account): Promise<Business> {

    try {
      let doc = await this.model.findOne({ "accounts.email": account.email });
      if (doc)
        throw new Error(`Account with the provided email already exist`);

      doc = await this.model.findByIdAndUpdate(businessId,
        { $addToSet: { accounts: account } }, { new: true }
      );

      if (!doc)
        throw new Error(`Account not found`);
      return MongoBusinessMapper.toEntity(doc, account);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async findByAccountEmail(email: string): Promise<Business>  {

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

  async findByPasswordResetToken(email: string, token: string): Promise<Business> {
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

  async requestPasswordReset(email: string, token: string, expires: Date) {
    try {
      const result = await this.model.updateOne(
        {},
        { $set: {
          "accounts.$[elem].passwordResetToken": token,
          "accounts.$[elem].passwordResetExpires": expires}
        },
        { arrayFilters: [ { "elem.email": email } ] }
      );
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw  new Error(`Error updating account: ${result.nModified } updated `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async updatePassword(email: string, password: string) {
    try {
      const result = await this.model.updateOne(
        {},
        { $set: {
          "accounts.$[elem].password": password,
          "accounts.$[elem].passwordResetToken": null,
          "accounts.$[elem].passwordResetExpires": null
        } },
        { arrayFilters: [ { "elem.email": email } ] }
      );
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw  new Error(`Error updating account: ${result.nModified } updated `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async deleteAccount(email: string, modifer: LoggedInUser) {

    try {
      const result = await this.model.updateOne(
        {},
        { $set: {
          "accounts.$[elem].deleted": true,
          "accounts.$[elem].deletedBy": modifer
        }},
        { arrayFilters: [ { "elem.email": email } ] }
      );
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw  new Error(`Error deleting account: ${result.nModified } deleted `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  private processCurrentUser(users: Account[], email: string): Account {

    const currentUser = <Account>users.find(account => {
      return account.email === email;
    });

    if (currentUser.deleted) {
      throw new Error("Account disabled");
    }
    return currentUser;
  }

  private async updateLastLogin(user: Account) {
    return this.model.updateOne(
      { },
      { $set: { "accounts.$[element].lastLogIn": new Date()}},
      { arrayFilters: [ { "element.email": user.email} ] }
    );
  }
}
