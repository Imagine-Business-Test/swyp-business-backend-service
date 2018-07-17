"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSerializer = {
    serialize(response) {
        if (Array.isArray(response)) {
            return response.map(form => {
                return {
                    name: form.name,
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
            lastModifier: response.getLastModifier(),
            workspace: response.getWorkspace(),
            updatedAt: response.getLastUpdateDate(),
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
        return response.map(form => {
            return {
                name: form.name,
                id: form._id,
                slug: form.slug
            };
        });
    }
};
//# sourceMappingURL=form-serializer.js.map