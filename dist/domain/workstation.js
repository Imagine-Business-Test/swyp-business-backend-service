"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form_1 = require("./form");
class Workstation {
    constructor(name, business, creator, lastModifier, deleted, _id, createdAt, updatedAt) {
        this.lastModifier = lastModifier;
        this.creator = creator;
        this.business = business;
        this.deleted = deleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.name = name;
        this._id = _id;
    }
    createForm(name, content, creator) {
        const deleted = false, status = "active";
        return new form_1.Form(name, this.getId(), this.getBusinessId(), content, status, creator, creator, deleted);
    }
    getCreationDate() {
        return this.createdAt;
    }
    getLastUpdateDate() {
        return this.updatedAt;
    }
    getLastModifier() {
        return this.lastModifier;
    }
    getBusinessId() {
        return this.business;
    }
    getCreator() {
        return this.creator;
    }
    isDeleted() {
        return this.deleted;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this._id;
    }
}
exports.Workstation = Workstation;
//# sourceMappingURL=workstation.js.map