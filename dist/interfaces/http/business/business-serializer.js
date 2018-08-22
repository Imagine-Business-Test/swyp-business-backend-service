"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessSerializer = {
    serialize(response) {
        let { business } = response;
        const { user, token } = response;
        business = {
            accounts: pruneSensitiveData(business.getAccounts()),
            logoUrl: business.getLogo(),
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
            user: pruneSensitiveData(user)
        };
    },
    lean(responses) {
        return responses.map(res => {
            return {
                logo: res.logoUrl,
                name: res.name,
                slug: res.slug
            };
        });
    }
};
const pruneSensitiveData = (accounts) => {
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
                phone: account.phone
            };
        });
    }
    return {
        created: accounts.created,
        email: accounts.email,
        lastLogIn: accounts.lastLoginIn,
        name: accounts.name,
        phone: accounts.phone,
        role: accounts.role
    };
};
//# sourceMappingURL=business-serializer.js.map