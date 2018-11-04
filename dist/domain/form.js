"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./response");
class Form {
    constructor(name, slug, workstation, business, content, status, elementCount, createdBy, modifier, deleted, id, updatedAt, createdAt) {
        this.elementCount = elementCount;
        this.workstation = workstation;
        this.lastModifier = modifier;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.creator = createdBy;
        this.business = business;
        this.content = content;
        this.deleted = deleted;
        this.status = status;
        this.name = name;
        this.id = id;
        this.slug = slug;
    }
    createResponse(content, respondant, branch) {
        const deleted = false;
        const status = "pending";
        const business = this.getBusiness();
        const form = {
            id: this.getId(),
            name: this.getName(),
            business: business.id
        };
        return new response_1.Response(respondant, branch, form, content, status, deleted);
    }
    getElementCount() {
        return this.elementCount;
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
        return this.id;
    }
    getName() {
        return this.name;
    }
    getSlug() {
        return this.slug;
    }
}
exports.Form = Form;
//# sourceMappingURL=form.js.map