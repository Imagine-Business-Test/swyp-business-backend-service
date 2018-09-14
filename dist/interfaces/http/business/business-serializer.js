"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessSerializer = {
    serialize(response) {
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
    lean(responses) {
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
const pruneSensitiveUserData = (accounts) => {
    if (Array.isArray(accounts)) {
        return accounts
            .filter((account) => !account.deleted)
            .map((account) => {
            return {
                lastLogIn: account.lastLoginIn,
                created: account.created,
                branch: account.branch,
                email: account.email,
                phone: account.phone,
                role: account.role,
                name: account.name,
                id: account._id
            };
        });
    }
    return {
        lastLogIn: accounts.lastLoginIn,
        created: accounts.created,
        branch: accounts.branch,
        email: accounts.email,
        phone: accounts.phone,
        role: accounts.role,
        name: accounts.name,
        id: accounts._id
    };
};
//# sourceMappingURL=business-serializer.js.map