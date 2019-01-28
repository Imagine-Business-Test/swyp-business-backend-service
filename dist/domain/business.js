"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Business {
    constructor(name, slug, approved, deleted, accounts, branches, logoUrl, description, id) {
        this.description = description;
        this.accounts = accounts;
        this.approved = approved;
        this.branches = branches;
        this.deleted = deleted;
        this.logoUrl = logoUrl;
        this.slug = slug;
        this.name = name;
        this.id = id;
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
    }
    getDiscription() {
        return this.description;
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