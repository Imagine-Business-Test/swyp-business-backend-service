"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(respondant, form, content, status, deleted, _id, createdAt, updatedAt) {
        this.respondant = respondant;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deleted = deleted;
        this.content = content;
        this.status = status;
        this.form = form;
        this._id = _id;
    }
    isDeleted() {
        return this.deleted;
    }
    getLastMoficationDate() {
        return this.updatedAt;
    }
    getRespondant() {
        return this.respondant;
    }
    getCreationDate() {
        return this.createdAt;
    }
    getContent() {
        return this.content;
    }
    getStatus() {
        return this.status;
    }
    getFormId() {
        return this.form;
    }
    getId() {
        return this._id;
    }
}
exports.Response = Response;
//# sourceMappingURL=response.js.map