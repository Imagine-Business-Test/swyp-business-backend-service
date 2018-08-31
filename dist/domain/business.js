"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workspace_1 = require("./workspace");
class Business {
    constructor(name, slug, approved, deleted, accounts, branches, logoUrl, id) {
        this.accounts = accounts;
        this.approved = approved;
        this.branches = branches;
        this.deleted = deleted;
        this.logoUrl = logoUrl;
        this.slug = slug;
        this.name = name;
        this.id = id;
    }
    createWorkspace(name) {
        const loggedinUser = {
            email: this.currentUser.email,
            name: this.currentUser.name
        };
        const business = {
            id: this.getId(),
            name: this.getSlug()
        };
        const deleted = false;
        return new workspace_1.Workspace(name, business, loggedinUser, loggedinUser, deleted);
    }
    setUser(user) {
        for (const entry of this.accounts) {
            if (entry.email === user.email) {
                this.currentUser = user;
                break;
            }
        }
        if (!this.currentUser) {
            throw new Error(`${user.name} does not belong to ${this.name}`);
        }
        return true;
    }
    getBranches() {
        return this.branches;
    }
    getId() {
        return this.id;
    }
    getAccounts() {
        return this.accounts;
    }
    getSlug() {
        return this.slug;
    }
    getLogo() {
        return this.logoUrl;
    }
    getName() {
        return this.name;
    }
    getUser() {
        return this.currentUser;
    }
    isApproved() {
        return this.approved;
    }
    isDeleted() {
        return this.deleted;
    }
}
exports.Business = Business;
//# sourceMappingURL=business.js.map