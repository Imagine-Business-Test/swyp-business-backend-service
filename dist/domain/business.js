"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workspace_1 = require("./workspace");
class Business {
    constructor(name, logoUrl, accounts, _id) {
        this.accounts = accounts;
        this.logoUrl = logoUrl;
        this.name = name;
        this._id = _id;
    }
    createWorkspace(name) {
        const loggedinUser = {
            name: this.currentUser.name,
            email: this.currentUser.email
        };
        const business = this._id;
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
        if (!this.currentUser)
            throw new Error(`${user.name} does not belong to ${(this.name)}`);
        return true;
    }
    getId() {
        return this._id;
    }
    getAccounts() {
        return this.accounts;
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
}
exports.Business = Business;
//# sourceMappingURL=business.js.map