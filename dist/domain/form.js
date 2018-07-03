"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./response");
class Form {
    constructor(name, workstation, business, content, status, createdBy, modifier, deleted, _id, updatedAt, createdAt) {
        this.workstation = workstation;
        this.creator = createdBy;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.business = business;
        this.lastModifier = modifier;
        this.content = content;
        this.deleted = deleted;
        this.status = status;
        this.name = name;
        this._id = _id;
    }
    createResponse(content, respondant) {
        const deleted = false;
        const status = "pending";
        const form = {
            _id: this.getId(),
            business: this.getBusiness(),
            workspace: this.getWorkspace()
        };
        return new response_1.Response(respondant, form, content, status, deleted);
    }
    getLastModifier() {
        return this.lastModifier;
    }
    getCreationDate() {
        return this.createdAt;
    }
    getLastUpdateDate() {
        return this.updatedAt;
    }
    getCreator() {
        return this.creator;
    }
    getWorkspace() {
        return this.workstation;
    }
    isDeleted() {
        return this.deleted;
    }
    getContent() {
        return this.content;
    }
    getBusiness() {
        return this.business;
    }
    getStatus() {
        return this.status;
    }
    getId() {
        return this._id;
    }
    getName() {
        return this.name;
    }
}
exports.Form = Form;
//# sourceMappingURL=form.js.map