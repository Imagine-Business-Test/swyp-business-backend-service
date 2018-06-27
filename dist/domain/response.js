"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(respondant, form, content, status, deleted, _id, note, processor, notedBy, createdAt, updatedAt) {
        this.processor = processor;
        this.respondant = respondant;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deleted = deleted;
        this.content = content;
        this.notedBy = notedBy;
        this.status = status;
        this.form = form;
        this.note = note;
        this._id = _id;
    }
    getLastMoficationDate() {
        return this.updatedAt;
    }
    getProcessor() {
        return this.processor;
    }
    getNoter() {
        return this.notedBy;
    }
    getNote() {
        return this.note;
    }
    isDeleted() {
        return this.deleted;
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
    getForm() {
        return this.form;
    }
    getId() {
        return this._id;
    }
}
exports.Response = Response;
//# sourceMappingURL=response.js.map