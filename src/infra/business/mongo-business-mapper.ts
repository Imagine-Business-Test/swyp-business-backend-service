import { Business } from "../../domain";
import { BusinessInterface } from "../../contracts/infra";
import { Account } from "../../contracts/domain";

export const MongoBusinessMapper = {
  toEntity(dbRow: BusinessInterface, currentUser?: Account): Business {
    const { _id, name, logoUrl, accounts } = dbRow;
    const business = new Business(name, logoUrl, accounts, _id);

    if (currentUser) {
      business.setUser(currentUser);
    }
    return business;
  },

  toDatabase(business: Business) {
    return {
      name: business.getName(),
      logoUrl: business.getLogo(),
      accounts: business.getAccounts()
    };
  }
};
