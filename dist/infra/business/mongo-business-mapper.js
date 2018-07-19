"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
exports.MongoBusinessMapper = {
    toEntity(dbRow, currentUser) {
        const { _id, name, slug, logoUrl, approved, deleted, accounts } = dbRow;
        const business = new domain_1.Business(name, slug, approved, deleted, accounts, logoUrl, _id);
        if (currentUser) {
            business.setUser(currentUser);
        }
        return business;
    },
    toDatabase(business) {
        return {
            accounts: business.getAccounts(),
            logoUrl: business.getLogo(),
            name: business.getName(),
            slug: business.getSlug()
        };
    }
};
//# sourceMappingURL=mongo-business-mapper.js.map