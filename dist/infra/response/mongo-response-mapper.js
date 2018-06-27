"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
exports.MongoResponseMapper = {
    toEntity(doc) {
        const { _id, respondant, deleted, content, status, updatedAt, createdAt, form, note, notedBy, processor } = doc;
        return new domain_1.Response(respondant, form, content, status, deleted, _id, note, processor, notedBy, createdAt, updatedAt);
    },
    toDatabase(response) {
        return {
            respondant: response.getRespondant(),
            form: response.getForm(),
            content: response.getContent(),
            status: response.getStatus(),
            deleted: response.isDeleted(),
            createdAt: response.getCreationDate(),
            updatedAt: response.getLastMoficationDate()
        };
    }
};
//# sourceMappingURL=mongo-response-mapper.js.map