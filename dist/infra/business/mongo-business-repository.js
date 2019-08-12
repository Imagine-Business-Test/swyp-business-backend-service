"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_business_mapper_1 = require("./mongo-business-mapper");
const mongoose_1 = __importDefault(require("mongoose"));
class MongoBusinessRepository {
    constructor(businessModel) {
        this.model = businessModel;
    }
    isTokenValid(tokenDate) {
        return (new Date > tokenDate) ? false : true;
    }
    findByPasswordResetToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.fetchOne({
                "accounts.passwordResetToken": token
            });
            const currentUser = this.processCurrentUser(doc.accounts, "", token);
            const tokenValid = this.isTokenValid(currentUser.passwordResetExpires);
            if (!tokenValid) {
                throw new Error(`Token Invalid`);
            }
            return mongo_business_mapper_1.MongoBusinessMapper.toEntity(doc, currentUser);
        });
    }
    findByAccountEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.fetchOne({
                "accounts.email": email,
                "accounts.deleted": false
            });
            const currentUser = this.processCurrentUser(doc.accounts, email);
            yield this.updateLastLogin(currentUser);
            return mongo_business_mapper_1.MongoBusinessMapper.toEntity(doc, currentUser);
        });
    }
    deleteAccount(email, modifer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.accountRelatedUpdate({
                $set: {
                    "accounts.$[element].deleted": true,
                    "accounts.$[element].deletedBy": modifer
                }
            }, { arrayFilters: [{ "element.email": email, "element.deleted": false }] });
        });
    }
    deleteBranch(name, modifer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.accountRelatedUpdate({
                $set: {
                    "branches.$[element].deleted": true,
                    "branches.$[element].deletedBy": modifer
                }
            }, { arrayFilters: [{ "element.name": name, "element.deleted": false }] });
        });
    }
    add(business) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = mongo_business_mapper_1.MongoBusinessMapper.toDatabase(business);
                const doc = yield this.model.create(data);
                return mongo_business_mapper_1.MongoBusinessMapper.toEntity(doc, doc.accounts[0]);
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    updateDetails(businessId, logoUrl, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne({ _id: businessId }, { $set: { logoUrl, description } });
                if (result.nModified !== 1) {
                    throw new Error(`Error updating content ${result.nModified} updated`);
                }
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    updateUser(userId, otherInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.accountRelatedUpdate({
                $set: {
                    "accounts.$[element]": otherInfo
                }
            }, {
                arrayFilters: [{ "element._id": mongoose_1.default.Types.ObjectId(userId) }]
            });
        });
    }
    updatePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.accountRelatedUpdate({
                $set: {
                    "accounts.$[element].password": password,
                    "accounts.$[element].passwordResetExpires": null,
                    "accounts.$[element].passwordResetToken": null
                }
            }, { arrayFilters: [{ "element.email": email, "element.deleted": false }] });
        });
    }
    requestPasswordReset(email, token, expires) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.accountRelatedUpdate({
                $set: {
                    "accounts.$[element].passwordResetExpires": expires,
                    "accounts.$[element].passwordResetToken": token
                }
            }, { arrayFilters: [{ "element.email": email, "element.deleted": false }] });
        });
    }
    addAccount(businessId, account) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let doc = yield this.model.findOne({
                    "accounts.email": account.email,
                    "accounts.deleted": false
                });
                if (doc && doc.deleted) {
                    throw new Error(`Account with the provided email already exist`);
                }
                doc = yield this.model.findByIdAndUpdate(businessId, {
                    $addToSet: { accounts: account }
                }, { new: true });
                if (!doc) {
                    throw new Error(`Account not found`);
                }
                return mongo_business_mapper_1.MongoBusinessMapper.toEntity(doc, account);
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    addBranch(businessId, branch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let doc = yield this.model.findOne({
                    "branch.name": branch.name,
                    "branch.deleted": false
                });
                if (doc && doc.deleted) {
                    throw new Error(`Branch with the provided name already exist`);
                }
                doc = yield this.model.findByIdAndUpdate(businessId, {
                    $addToSet: { branches: branch }
                }, { new: true });
                if (!doc) {
                    throw new Error(`Branch not found`);
                }
                return mongo_business_mapper_1.MongoBusinessMapper.toEntity(doc);
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    fetchAll() {
        return this.model.find({ approved: true });
    }
    updateLastLogin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountRelatedUpdate({ $set: { "accounts.$[element].lastLogIn": new Date() } }, {
                arrayFilters: [
                    { "element.email": user.email, "element.deleted": false }
                ]
            });
        });
    }
    fetchOne(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.model.findOne(condition);
                if (!doc) {
                    throw new Error(`Account not found`);
                }
                return doc;
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    accountRelatedUpdate(update, arrayCondition) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne({}, update, arrayCondition);
                if (result.nModified !== 1) {
                    throw new Error("Update operation failed");
                }
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    processCurrentUser(users, email, token) {
        let currentUser;
        if (token) {
            currentUser = users.find(user => user.passwordResetToken === token && user.deleted === false);
        }
        else {
            currentUser = users.find(user => user.email === email && user.deleted === false);
        }
        if (!currentUser) {
            throw new Error("Account disabled");
        }
        return currentUser;
    }
}
exports.MongoBusinessRepository = MongoBusinessRepository;
//# sourceMappingURL=mongo-business-repository.js.map