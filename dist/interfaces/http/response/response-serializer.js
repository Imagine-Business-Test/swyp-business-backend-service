"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSerializer = {
    serializeResult(response) {
        let { result } = response;
        result = tranformData(result);
        response.result = result;
        return response;
    },
    serialize(response) {
        if (Array.isArray(response)) {
            return tranformData(response);
        }
        return {
            id: response.getId(),
            form: response.getForm(),
            notes: response.getNotes(),
            status: response.getStatus(),
            content: response.getContent(),
            respondant: response.getRespondant(),
            createdAt: response.getCreationDate(),
            updatedAt: response.getLastMoficationDate()
        };
    }
};
const tranformData = (response) => {
    return response.map((res) => {
        return {
            id: res._id,
            form: res.form,
            notes: res.notes,
            status: res.status,
            branche: res.branch,
            content: res.content,
            updatedAt: res.updatedAt,
            createdAt: res.createdAt,
            respondant: res.respondant,
            processors: res.processors
        };
    });
};
//# sourceMappingURL=response-serializer.js.map