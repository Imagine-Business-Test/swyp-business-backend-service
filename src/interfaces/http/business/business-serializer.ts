import { IBusinessInterface } from "../../../contracts/infra";
import { IAccount } from "../../../contracts/domain";

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
        description: res.description,
        branches: res.branches,
        logo: res.logoUrl,
        name: res.name,
        slug: res.slug,
        id: res._id
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
          lastLogIn: account.lastLoginIn,
          created: account.created,
          branch: account.branch,
          email: account.email,
          phone: account.phone,
          role: account.role,
          name: account.name,
          firstname: account.firstname,
          lastname: account.lastname,
          id: account._id
        };
      });
  }

  return {
    lastLogIn: (accounts as IAccount).lastLoginIn,
    created: (accounts as IAccount).created,
    branch: (accounts as IAccount).branch,
    email: (accounts as IAccount).email,
    phone: (accounts as IAccount).phone,
    role: (accounts as IAccount).role,
    name: (accounts as IAccount).name,
    firstname: (accounts as IAccount).firstname,
    lastname: (accounts as IAccount).lastname,
    id: (accounts as IAccount)._id
  };
};
