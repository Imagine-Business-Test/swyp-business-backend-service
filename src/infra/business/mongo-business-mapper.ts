import { IAccount } from "../../contracts/domain";
import { BusinessInterface } from "../../contracts/infra";
import { Business } from "../../domain";

export const MongoBusinessMapper = {
  toEntity(dbRow: BusinessInterface, currentUser?: IAccount): Business {
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
