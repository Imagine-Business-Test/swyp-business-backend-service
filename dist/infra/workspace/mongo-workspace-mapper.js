"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
exports.MongoWorkspaceMapper = {
    toEntity(doc) {
        const { _id, name, business, creator, lastModifier, deleted, createdAt, updatedAt } = doc;
        return new domain_1.Workspace(name, business, creator, lastModifier, deleted, _id, createdAt, updatedAt);
    },
    toDatabase(workspace) {
        return {
            lastModifier: workspace.getLastModifier(),
            creator: workspace.getCreator(),
            business: workspace.getBusinessId(),
            name: workspace.getName(),
        };
    }
};
//# sourceMappingURL=mongo-workspace-mapper.js.map