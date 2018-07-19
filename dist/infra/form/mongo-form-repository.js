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
const mongo_form_mapper_1 = require("./mongo-form-mapper");
class MongoFormRepository {
    constructor(formModel) {
        this.model = formModel;
    }
    add(form) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.model.create(mongo_form_mapper_1.MongoFormMapper.toDatabase(form));
                return mongo_form_mapper_1.MongoFormMapper.toEntity(doc);
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.model.findOne({ _id: id });
                if (!doc) {
                    throw new Error("The specified form record is not found");
                }
                return mongo_form_mapper_1.MongoFormMapper.toEntity(doc);
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    getByBusiness(business) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model
                .find({
                $or: [
                    { "business.name": { $regex: new RegExp("^" + business, "i") } },
                    { "business.id": business }
                ],
                status: "active",
                deleted: false
            })
                .limit(10)
                .select("name slug _id");
        });
    }
    getBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model
                .findOne({ slug, status: "active", deleted: false })
                .select("content business _id");
        });
    }
    getByWorkspace(workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.find({ workspace, status: "active", deleted: false });
        });
    }
    updateContent(id, content, modifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne({ _id: id }, { $set: { content, lastModifier: modifier } });
                if (result.nModified !== 1 || result.nMatched === 1) {
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
    disable(id, modifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne({ _id: id }, { $set: { status: "disabled", lastUpdatedBy: modifier } });
                if (result.nModified !== 1 || result.nMatched === 1) {
                    throw new Error(`Error disabling form: ${result.nModified} affected `);
                }
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    delete(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne({ _id: id }, { $set: { deleted: true, lastUpdatedBy: user } });
                if (result.nModified !== 1 || result.nMatched === 1) {
                    throw new Error(`Error deleting form: ${result.nModified} deleted `);
                }
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
}
exports.MongoFormRepository = MongoFormRepository;
//# sourceMappingURL=mongo-form-repository.js.map