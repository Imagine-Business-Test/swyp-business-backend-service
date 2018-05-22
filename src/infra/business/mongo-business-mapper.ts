import { Business } from "../../domain";
import { BusinessInterface } from "../../contracts/infra";
import { Account } from "../../contracts/domain";

export const MongoBusinessMapper = {
  toEntity(dbRow: BusinessInterface, currentUser: Account): Business {
    const { _id, name, logoUrl, accounts } = dbRow;
    const business = new Business(name, logoUrl, accounts, _id);
    business.setCurrentUser(currentUser);
    return business;
  },

  toDatabase(business: Business) {
    return {
      name: business.name,
      logoUrl: business.logoUrl,
      accounts: business.accounts
    };
  }
};
