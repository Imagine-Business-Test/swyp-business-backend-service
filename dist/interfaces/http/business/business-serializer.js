"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessSerializer = {
    serialize(response) {
        let { business } = response;
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
const pruneSensitiveData = (accounts) => {
    if (Array.isArray(accounts)) {
        return accounts.filter((account) => !account.deleted)
            .map((account) => {
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
        lastLogIn: accounts.lastLoginIn,
        created: accounts.created,
        phone: accounts.phone,
        email: accounts.email,
        name: accounts.name
    };
};
//# sourceMappingURL=business-serializer.js.map