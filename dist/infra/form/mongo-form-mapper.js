"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
exports.MongoFormMapper = {
    toEntity(doc) {
        const { _id, name, slug, workspace, business, status, elementCount, creator, lastModifier, deleted, content, updateAt, createdAt } = doc;
        return new domain_1.Form(name, slug, workspace, business, content, status, elementCount, creator, lastModifier, deleted, _id, updateAt, createdAt);
    },
    toDatabase(form) {
        return {
            elementCount: form.getElementCount(),
            lastModifier: form.getLastModifier(),
            updateAt: form.getLastUpdateDate(),
            createdAt: form.getCreationDate(),
            workspace: form.getWorkspace(),
            business: form.getBusiness(),
            creator: form.getCreator(),
            content: form.getContent(),
            deleted: form.isDeleted(),
            slug: form.getSlug(),
            name: form.getName()
        };
    }
};
//# sourceMappingURL=mongo-form-mapper.js.map