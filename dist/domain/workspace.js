"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slug_1 = __importDefault(require("slug"));
const form_1 = require("./form");
class Workspace {
    constructor(name, business, creator, lastModifier, deleted, id, createdAt, updatedAt) {
        this.lastModifier = lastModifier;
        this.creator = creator;
        this.business = business;
        this.deleted = deleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.name = name;
        this.id = id;
    }
    createForm(name, content, creator) {
        const deleted = false;
        const status = "active";
        const sluggedName = slug_1.default(name);
        return new form_1.Form(name, sluggedName, this.getId(), this.getBusiness(), content, status, creator, creator, deleted);
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
    getBusiness() {
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
        return this.id;
    }
}
exports.Workspace = Workspace;
//# sourceMappingURL=workspace.js.map