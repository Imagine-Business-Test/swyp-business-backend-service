"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSerializer = {
    serialize(response) {
        if (Array.isArray(response)) {
            return response.map(form => {
                return {
                    status: form.status,
                    workstation: form.workstation,
                    content: form.content,
                    creator: form.creator,
                    lastModifier: form.lastModifier,
                    createdAt: form.createdAt,
                    updatedAt: form.updateAt,
                    _id: form._id
                };
            });
        }
        return {
            lastModifier: response.getLastModifier(),
            workstation: response.getWorkstationId(),
            updatedAt: response.getLastUpdateDate(),
            created: response.getCreationDate(),
            creator: response.getCreator(),
            content: response.getContent(),
            name: response.getName(),
            _id: response.getId()
        };
    }
};
//# sourceMappingURL=form-serializer.js.map