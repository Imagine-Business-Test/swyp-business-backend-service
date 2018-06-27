"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceSerializer = {
    serialize(response) {
        if (Array.isArray(response)) {
            return response.map(workspace => {
                return {
                    lastModifier: workspace.lastModifier,
                    updatedAt: workspace.updatedAt,
                    createdAt: workspace.createdAt,
                    business: workspace.business,
                    creator: workspace.creator,
                    name: workspace.name,
                    _id: workspace._id
                };
            });
        }
        return {
            lastModifier: response.getLastModifier(),
            updatedAt: response.getLastUpdateDate(),
            createdAt: response.getCreationDate(),
            business: response.getBusinessId(),
            creator: response.getCreator(),
            name: response.getName(),
            _id: response.getId()
        };
    }
};
//# sourceMappingURL=workspace-serializer.js.map