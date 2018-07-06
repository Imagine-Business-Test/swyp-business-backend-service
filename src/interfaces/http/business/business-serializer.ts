import { IAccount } from "../../../contracts/domain";

export const BusinessSerializer = {
  serialize(response: any) {
    let { business } = response;
    const { user, token } = response;

    business = {
      accounts: pruneSensitiveData(business.getAccounts()),
      id: business.getId(),
      logoUrl: business.getLogo(),
      name: business.getName()
    };

    if (!user) {
      return business;
    }
    return {
      business,
      token,
      user: pruneSensitiveData(user)
    };
  }
};

const pruneSensitiveData = (accounts: IAccount[] | IAccount) => {
  if (Array.isArray(accounts)) {
    return accounts
      .filter((account: IAccount) => !account.deleted)
      .map((account: IAccount) => {
        return {
          created: account.created,
          email: account.email,
          lastLogIn: account.lastLoginIn,
          name: account.name,
          phone: account.phone
        };
      });
  }

  return {
    created: (accounts as IAccount).created,
    email: (accounts as IAccount).email,
    lastLogIn: (accounts as IAccount).lastLoginIn,
    name: (accounts as IAccount).name,
    phone: (accounts as IAccount).phone
  };
};
