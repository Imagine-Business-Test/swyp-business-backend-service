"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
exports.MongoWorkstationMapper = {
    toEntity(doc) {
        const { _id, name, business, creator, lastModifier, deleted, createdAt, updatedAt } = doc;
        return new domain_1.Workstation(name, business, creator, lastModifier, deleted, _id, createdAt, updatedAt);
    },
    toDatabase(workStation) {
        return {
            lastModifier: workStation.getLastModifier(),
            creator: workStation.getCreator(),
            business: workStation.getBusinessId(),
            name: workStation.getName(),
        };
    }
};
//# sourceMappingURL=mongo-workstation-mapper.js.map