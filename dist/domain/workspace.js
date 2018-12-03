"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Workspace {
    constructor(name, parent, creator, lastModifier, deleted, id, createdAt, updatedAt) {
        this.lastModifier = lastModifier;
        this.creator = creator;
        this.parent = parent;
        this.deleted = deleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.name = name;
        this.id = id;
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
    getParent() {
        return this.parent;
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