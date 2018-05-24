import { BusinessModel, BusinessInterface } from "../../contracts/infra";
import { MongoBusinessMapper } from "./mongo-business-mapper";
import { Account } from "../../contracts/domain";
import { Business } from "../../domain";

export class MongoBusinessRepository {
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
        account.lastLoginIn = new Date();
      const doc = await this.model.findByIdAndUpdate(businessId,
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

      if (!doc)
        throw new Error(`Account not found`);
      const currentUser = <Account>doc.accounts.find(account => {
        return account.email === email;
      });

      await this.updateLastLogin(currentUser);

      return MongoBusinessMapper.toEntity(doc, currentUser);
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
