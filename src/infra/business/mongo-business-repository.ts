import { BusinessModel, BusinessInterface } from "../../contracts/infra";
import { BusinessRepository } from "../../contracts/repositories";
import { MongoBusinessMapper } from "./mongo-business-mapper";
import { Account } from "../../contracts/domain";
import { Business } from "../../domain";


export class MongoBusinessRepository implements BusinessRepository {
  private model: BusinessModel;

  constructor(model: BusinessModel) {
    this.model = model;
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
      let doc = await this.model.findOne({ "accounts": { email: account.email }});
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
      const doc = await this.model.findOne({ "accounts": { email: email }});

      if (!doc) {
        throw new Error(`Account not found`);
      }

      const currentUser = <Account>doc.accounts.find(account => {
        return account.email === email;
      });

      if (currentUser.deleted) {
        throw new Error("Account disabled");
      }
      await this.updateLastLogin(currentUser);
      return MongoBusinessMapper.toEntity(doc, currentUser);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async requestPasswordReset(email: string, token: string, expires: Date) {
    try {
      const result = await this.model.updateOne(
        {},
        { $set: {
          "account.$[elem].passwordResetToken": token,
          "account.$[elem].passwordResetExpires": expires}
        },
        { arrayFilters: [ { "elem.email": email } ] }
      );
      if (result.nModified !== 1 && result.nMatched === 1) {
        throw  new Error(`Error updating account: ${result.nModified } affected `);
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
        { $set: {"account.$[elem].password": password } },
        { arrayFilters: [ { "elem.email": email } ] }
      );
      if (result.nModified !== 1 && result.nMatched === 1) {
        throw  new Error(`Error updating account: ${result.nModified } affected `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  async deleteAccount(email: string) {

    try {
      const result = await this.model.updateOne(
        {},
        { $set: { "accounts.$[elem].deleted": true }},
        { arrayFilters: [ { "elem.email": email } ] }
      );
      if (result.nModified !== 1 && result.nMatched === 1) {
        throw  new Error(`Error deleting account: ${result.nModified } affected `);
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  private async updateLastLogin(user: Account) {

    return this.model.updateOne(
      { },
      { $set: { "accounts.$[elem].lastLogIn": new Date()}},
      { arrayFilters: [ { "elem.email": user.email} ] }
    );
  }
}
