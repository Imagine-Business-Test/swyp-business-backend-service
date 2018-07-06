"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_business_mapper_1 = require("./mongo-business-mapper");
class MongoBusinessRepository {
    constructor(businessModel) {
        this.model = businessModel;
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
    addAccount(businessId, account) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let doc = yield this.model.findOne({ "accounts.email": account.email });
                if (doc) {
                    throw new Error(`Account with the provided email already exist`);
                }
                doc = yield this.model.findByIdAndUpdate(businessId, { $addToSet: { accounts: account } }, { new: true });
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
    findByAccountEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.model.findOne({ "accounts.email": email });
                if (!doc) {
                    throw new Error(`Account not found`);
                }
                const currentUser = this.processCurrentUser(doc.accounts, email);
                yield this.updateLastLogin(currentUser);
                return mongo_business_mapper_1.MongoBusinessMapper.toEntity(doc, currentUser);
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    findByPasswordResetToken(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.model.findOne({
                "accounts.email": email,
                "accounts.passwordResetToken": token
            });
            if (!doc) {
                throw new Error(`Account not found`);
            }
            const currentUser = this.processCurrentUser(doc.accounts, email);
            return mongo_business_mapper_1.MongoBusinessMapper.toEntity(doc, currentUser);
        });
    }
    requestPasswordReset(email, token, expires) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne({}, {
                    $set: {
                        "accounts.$[elem].passwordResetExpires": expires,
                        "accounts.$[elem].passwordResetToken": token
                    }
                }, { arrayFilters: [{ "elem.email": email }] });
                if (result.nModified !== 1 || result.nMatched === 1) {
                    throw new Error(`Error updating account: ${result.nModified} updated `);
                }
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    updatePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne({}, {
                    $set: {
                        "accounts.$[elem].password": password,
                        "accounts.$[elem].passwordResetExpires": null,
                        "accounts.$[elem].passwordResetToken": null
                    }
                }, { arrayFilters: [{ "elem.email": email }] });
                if (result.nModified !== 1 || result.nMatched === 1) {
                    throw new Error(`Error updating account: ${result.nModified} updated `);
                }
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    deleteAccount(email, modifer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne({}, {
                    $set: {
                        "accounts.$[elem].deleted": true,
                        "accounts.$[elem].deletedBy": modifer
                    }
                }, { arrayFilters: [{ "elem.email": email }] });
                if (result.nModified !== 1 || result.nMatched === 1) {
                    throw new Error(`Error deleting account: ${result.nModified} deleted `);
                }
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    processCurrentUser(users, email) {
        const currentUser = users.find(account => {
            return account.email === email;
        });
        if (currentUser.deleted) {
            throw new Error("Account disabled");
        }
        return currentUser;
    }
    updateLastLogin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.updateOne({}, { $set: { "accounts.$[element].lastLogIn": new Date() } }, { arrayFilters: [{ "element.email": user.email }] });
        });
    }
}
exports.MongoBusinessRepository = MongoBusinessRepository;
//# sourceMappingURL=mongo-business-repository.js.map