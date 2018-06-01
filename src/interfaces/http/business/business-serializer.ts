import { Account } from "../../../contracts/domain";
import { Business } from "../../../domain";

export const BusinessSerializer = {
  serialize(business: Business) {
    return {
      accounts: pruneSensitiveData(business.getAccounts()),
      logoUrl: business.getLogo(),
      name: business.getName(),
      _id: business.getId()
    };
  }
};

const pruneSensitiveData = (accounts: Account[]) => {
  return accounts.map(account => {
    return {
      lastLogIn: account.lastLoginIn,
      created: account.created,
      phone: account.phone,
      email: account.email,
      name: account.name
    };
  });
};
