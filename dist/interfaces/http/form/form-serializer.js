"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSerializer = {
    serialize(response) {
        if (Array.isArray(response)) {
            return response.map(form => {
                return {
                    name: form.name,
                    elementCount: form.elementCount,
                    workspace: form.workspace,
                    business: form.business,
                    content: form.content,
                    creator: form.creator,
                    lastModifier: form.lastModifier,
                    createdAt: form.createdAt,
                    updatedAt: form.updateAt,
                    id: form._id,
                    slug: form.slug
                };
            });
        }
        return {
            elementCount: response.getElementCount(),
            lastModifier: response.getLastModifier(),
            updatedAt: response.getLastUpdateDate(),
            workspace: response.getWorkspace(),
            created: response.getCreationDate(),
            business: response.getBusiness(),
            creator: response.getCreator(),
            content: response.getContent(),
            name: response.getName(),
            slug: response.getSlug(),
            id: response.getId()
        };
    },
    forBusiness(response) {
        if (Array.isArray(response)) {
            return response.map(form => {
                return {
                    name: form.name,
                    id: form._id,
                    slug: form.slug
                };
            });
        }
        return {
            content: response.getContent(),
            id: response.getId(),
            business: response.getBusiness()
        };
    }
};
//# sourceMappingURL=form-serializer.js.map