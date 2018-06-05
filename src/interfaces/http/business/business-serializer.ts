import { Account } from "../../../contracts/domain";

export const BusinessSerializer = {
  serialize(response: any) {
    let   { business }    = response;
    const { user, token } = response;

    if (!business) {
      business = response;
    }

    business = {
      accounts: pruneSensitiveData(business.getAccounts()),
      logoUrl: business.getLogo(),
      name: business.getName(),
      _id: business.getId()
    };

    if (!user) {
      return business;
    }
    return {
      business,
      user: pruneSensitiveData(user),
      token
    };
  },

};

const pruneSensitiveData = (accounts: Account[] | Account ) => {
  if ( Array.isArray(accounts) ) {

    return accounts.filter((account: Account) => !account.deleted)
      .map((account: Account ) => {
      return {
        lastLogIn: account.lastLoginIn,
        created: account.created,
        phone: account.phone,
        email: account.email,
        name: account.name
      };
    });
  }

  return {
    lastLogIn: (<Account>accounts).lastLoginIn,
    created: (<Account>accounts).created,
    phone: (<Account>accounts).phone,
    email: (<Account>accounts).email,
    name: (<Account>accounts).name
  };
};
