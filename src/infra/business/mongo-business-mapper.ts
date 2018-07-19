import { IAccount } from "../../contracts/domain";
import { IBusinessInterface } from "../../contracts/infra";
import { Business } from "../../domain";

export const MongoBusinessMapper = {
  toEntity(dbRow: IBusinessInterface, currentUser?: IAccount): Business {
    const { _id, name, logoUrl, accounts } = dbRow;
    const business = new Business(name, logoUrl, accounts, _id);

    if (currentUser) {
      business.setUser(currentUser);
    }
    return business;
  },

  toDatabase(business: Business) {
    return {
      accounts: business.getAccounts(),
      logoUrl: business.getLogo(),
      name: business.getName()
    };
  }
};
