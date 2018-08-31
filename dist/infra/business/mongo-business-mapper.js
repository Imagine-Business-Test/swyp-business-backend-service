"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
exports.MongoBusinessMapper = {
    toEntity(dbRow, currentUser) {
        const { _id, name, slug, logoUrl, approved, deleted, accounts, branches } = dbRow;
        const business = new domain_1.Business(name, slug, approved, deleted, accounts, branches, logoUrl, _id);
        if (currentUser) {
            business.setUser(currentUser);
        }
        return business;
    },
    toDatabase(business) {
        return {
            accounts: business.getAccounts(),
            branches: business.getBranches(),
            logoUrl: business.getLogo(),
            name: business.getName(),
            slug: business.getSlug()
        };
    }
};
//# sourceMappingURL=mongo-business-mapper.js.map