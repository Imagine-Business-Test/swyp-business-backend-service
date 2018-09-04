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
                created: account.created,
                email: account.email,
                role: account.role,
                lastLogIn: account.lastLoginIn,
                name: account.name,
                phone: account.phone,
                branch: account.branch
            };
        });
    }
    return {
        created: accounts.created,
        branch: accounts.branch,
        email: accounts.email,
        lastLogIn: accounts.lastLoginIn,
        name: accounts.name,
        phone: accounts.phone,
        role: accounts.role
    };
};
//# sourceMappingURL=business-serializer.js.map