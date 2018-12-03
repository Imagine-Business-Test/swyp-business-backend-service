"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./response");
class Form {
    constructor(name, slug, workstation, business, elements, status, createdBy, modifier, deleted, id, updatedAt, createdAt) {
        this.workstation = workstation;
        this.lastModifier = modifier;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.creator = createdBy;
        this.business = business;
        this.elements = elements;
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
            workspace: this.getWorkspace().id,
            name: this.getName(),
            business: business.id,
            id: this.getId()
        };
        return new response_1.Response(respondant, branch, form, content, status, deleted);
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
    getElements() {
        return this.elements;
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