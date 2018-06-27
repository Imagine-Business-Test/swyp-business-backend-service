"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
exports.MongoFormMapper = {
    toEntity(doc) {
        const { _id, name, workstation, business, status, creator, lastModifier, deleted, content, updateAt, createdAt } = doc;
        return new domain_1.Form(name, workstation, business, content, status, creator, lastModifier, deleted, _id, updateAt, createdAt);
    },
    toDatabase(form) {
        return {
            lastModifier: form.getLastModifier(),
            workstation: form.getWorkstationId(),
            updateAt: form.getLastUpdateDate(),
            creator: form.getCreator(),
            createdAt: form.getCreationDate(),
            content: form.getContent(),
            deleted: form.isDeleted(),
            name: form.getName(),
        };
    }
};
//# sourceMappingURL=mongo-form-mapper.js.map