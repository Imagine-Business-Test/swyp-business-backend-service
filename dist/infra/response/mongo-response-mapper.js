"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
exports.MongoResponseMapper = {
    toEntity(doc) {
        const { _id, respondant, deleted, content, status, updatedAt, createdAt, form } = doc;
        return new domain_1.Response(respondant, form, content, status, deleted, _id, createdAt, updatedAt);
    },
    toDatabase(response) {
        return {
            respondant: response.getRespondant(),
            form: response.getFormId(),
            content: response.getContent(),
            status: response.getStatus(),
            deleted: response.isDeleted(),
            createdAt: response.getCreationDate(),
            updatedAt: response.getLastMoficationDate()
        };
    }
};
//# sourceMappingURL=mongo-response-mapper.js.map