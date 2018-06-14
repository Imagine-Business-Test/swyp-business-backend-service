"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSerializer = {
    serialize(response) {
        if (Array.isArray(response)) {
            return response.map(res => {
                return {
                    form: res.form,
                    content: res.content,
                    respondant: res.respondant,
                    status: res.status,
                    createdAt: res.createdAt,
                    updatedAt: res.updatedAt,
                    _id: res._id
                };
            });
        }
        return {
            form: response.getFormId(),
            content: response.getContent(),
            respondant: response.getRespondant(),
            status: response.getStatus(),
            createdAt: response.getCreationDate(),
            updatedAt: response.getLastMoficationDate()
        };
    }
};
//# sourceMappingURL=response-serializer.js.map