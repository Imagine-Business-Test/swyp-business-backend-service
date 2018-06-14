"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkStationSerializer = {
    serialize(response) {
        if (Array.isArray(response)) {
            return response.map(workstation => {
                return {
                    lastModifier: workstation.lastModifier,
                    updatedAt: workstation.updatedAt,
                    createdAt: workstation.createdAt,
                    business: workstation.business,
                    creator: workstation.creator,
                    name: workstation.name,
                    _id: workstation._id
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
//# sourceMappingURL=workstation-serializer.js.map