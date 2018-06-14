"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
exports.MongoBusinessMapper = {
    toEntity(dbRow, currentUser) {
        const { _id, name, logoUrl, accounts } = dbRow;
        const business = new domain_1.Business(name, logoUrl, accounts, _id);
        if (currentUser) {
            business.setUser(currentUser);
        }
        return business;
    },
    toDatabase(business) {
        return {
            name: business.getName(),
            logoUrl: business.getLogo(),
            accounts: business.getAccounts()
        };
    }
};
//# sourceMappingURL=mongo-business-mapper.js.map