import { IAccount } from "../../../contracts/domain";
import { IBusinessInterface } from "../../../contracts/infra";

export const BusinessSerializer = {
  serialize(response: any) {
    let { business } = response;
    const { user, token } = response;
    business = {
      accounts: pruneSensitiveUserData(business.getAccounts()),
      logoUrl: business.getLogo(),
      branches: business.getBranches(),
      name: business.getName(),
      slug: business.getSlug(),
      id: business.getId()
    };

    if (!user) {
      return business;
    }
    return {
      business,
      token,
      user: pruneSensitiveUserData(user)
    };
  },

  lean(responses: IBusinessInterface[]) {
    return responses.map(res => {
      return {
        branches: res.branches,
        logo: res.logoUrl,
        name: res.name,
        slug: res.slug
      };
    });
  }
};

const pruneSensitiveUserData = (accounts: IAccount[] | IAccount) => {
  if (Array.isArray(accounts)) {
    return accounts
      .filter((account: IAccount) => !account.deleted)
      .map((account: IAccount) => {
        return {
          created: account.created,
          email: account.email,
          role: account.role,
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
    phone: (accounts as IAccount).phone,
    role: (accounts as IAccount).role
  };
};
