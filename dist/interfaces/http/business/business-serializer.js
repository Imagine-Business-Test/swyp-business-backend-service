"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessSerializer = {
    serialize(response) {
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
    },
    lean(responses) {
        return responses.map(res => {
            return {
                name: res.name,
                logo: res.logoUrl
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
        phone: accounts.phone
    };
};
//# sourceMappingURL=business-serializer.js.map