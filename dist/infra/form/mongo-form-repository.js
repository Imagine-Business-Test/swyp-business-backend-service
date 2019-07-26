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
                    throw new Error(`Account not found`);
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
    fetchContentOf(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { formSlug, formType, formTypeParent, businessSlug } = options;
                const doc = yield this.model.findOne({
                    "workspace.parent": formTypeParent,
                    "business.slug": businessSlug,
                    "workspace.name": formType,
                    slug: formSlug
                });
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
    fetchByBusiness(business, formType, formTypeParent) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model
                .find({
                "business.id": business,
                "workspace.name": formType,
                "workspace.parent": formTypeParent,
                status: "active",
                deleted: false
            })
                .limit(50)
                .select("name slug workspace elements _id");
        });
    }
    fetchByWorkspace(workspace, businessId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.find({
                "workspace.id": workspace,
                "business.id": businessId,
                status: "active",
                deleted: false
            });
        });
    }
    updateContent(id, content, modifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne({ _id: id }, { $set: { content, lastModifier: modifier } });
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
    disable(id, modifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne({ _id: id }, { $set: { status: "disabled", lastUpdatedBy: modifier } });
                if (result.nModified !== 1) {
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
                if (result.nModified !== 1) {
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