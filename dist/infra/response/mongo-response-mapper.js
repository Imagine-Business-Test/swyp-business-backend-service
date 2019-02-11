"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
exports.MongoResponseMapper = {
    toEntity(doc) {
        const { _id, respondant, deleted, content, branch, status, updatedAt, createdAt, form, notes, processors } = doc;
        return new domain_1.Response(respondant, branch, form, content, status, deleted, _id, notes, processors, createdAt, updatedAt);
    },
    toDatabase(response) {
        return {
            updatedAt: response.getLastMoficationDate(),
            createdAt: response.getCreationDate(),
            respondant: response.getRespondant(),
            content: response.getContent(),
            branch: response.getBranch(),
            deleted: response.isDeleted(),
            status: response.getStatus(),
            form: response.getForm()
        };
    }
};
//# sourceMappingURL=mongo-response-mapper.js.map