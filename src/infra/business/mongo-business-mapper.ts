import { IAccount } from "../../contracts/domain";
import { IBusinessInterface } from "../../contracts/infra";
import { Business } from "../../domain";

export const MongoBusinessMapper = {
  toEntity(dbRow: IBusinessInterface, currentUser?: IAccount): Business {
    const {
      _id,
      name,
      slug,
      logoUrl,
      approved,
      deleted,
      accounts,
      branches
    } = dbRow;
    const business = new Business(
      name,
      slug,
      approved,
      deleted,
      accounts,
      branches,
      logoUrl,
      _id
    );
    if (currentUser) {
      business.setUser(currentUser);
    }
    return business;
  },

  toDatabase(business: Business) {
    return {
      accounts: business.getAccounts(),
      branches: business.getBranches(),
      logoUrl: business.getLogo(),
      name: business.getName(),
      slug: business.getSlug()
    };
  }
};
