"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(respondant, branch, form, content, status, deleted, id, notes, processors, createdAt, updatedAt) {
        this.processors = processors;
        this.respondant = respondant;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.branch = branch;
        this.deleted = deleted;
        this.content = content;
        this.status = status;
        this.form = form;
        this.notes = notes;
        this.id = id;
    }
    getLastMoficationDate() {
        return this.updatedAt;
    }
    getProcessors() {
        return this.processors;
    }
    getNotes() {
        return this.notes;
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
    getBranch() {
        return this.branch;
    }
    getId() {
        return this.id;
    }
}
exports.Response = Response;
//# sourceMappingURL=response.js.map