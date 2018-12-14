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
const mongo_response_mapper_1 = require("./mongo-response-mapper");
class MongoResponseRepository {
    constructor(responseModel) {
        this.model = responseModel;
    }
    getByForm(form) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model
                .find({ "form.id": form, deleted: false })
                .sort({ createdAt: -1 });
        });
    }
    addNote(id, note, notedBy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne({ _id: id }, {
                    $addToSet: { notes: { note, notedBy } },
                    $set: { updatedAt: new Date() }
                });
                if (result.nModified !== 1 || result.nMatched === 1) {
                    throw new Error(`Error updating response: ${result.nModified} updated `);
                }
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    makeAsprocessed(id, processor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update({ _id: id }, { $set: { status: "processed", processor, updatedAt: new Date() } });
        });
    }
    count(field) {
        return __awaiter(this, void 0, void 0, function* () {
            if (field) {
                return this.model.count(field);
            }
            return this.model.count({});
        });
    }
    add(response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.model.create(mongo_response_mapper_1.MongoResponseMapper.toDatabase(response));
                return mongo_response_mapper_1.MongoResponseMapper.toEntity(doc);
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    updateContent(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update({ _id: id }, { $set: { content } });
        });
    }
    getProcessingActivityStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const match = { $match: { status: "processed" } };
            const group = { $group: { _id: "$processor.name", count: { $sum: 1 } } };
            return this.model.aggregate([match, group]);
        });
    }
    getNotingActivityStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const match = { $match: { status: "noted" } };
            const group = { $group: { _id: "$notedBy.name", count: { $sum: 1 } } };
            return this.model.aggregate([match, group]);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update({ _id: id }, { $set: { deleted: true, updatedAt: new Date() } });
        });
    }
    findByStatus(business, branch, status, page = 1, limit = 25, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = page * limit - limit;
            const fromDate = new Date(from);
            const toDate = new Date(to);
            toDate.setDate(toDate.getDate() + 1);
            const condition = from && to
                ? {
                    "form.business": business,
                    branch,
                    status,
                    createdAt: { $gte: fromDate, $lte: toDate }
                }
                : { "form.business": business, branch, status };
            const queryPromise = this.model
                .find(condition)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            const countPromise = this.model.count(condition);
            const [result, count] = yield Promise.all([queryPromise, countPromise]);
            const pages = Math.ceil(count / limit);
            return { result, count, pages };
        });
    }
    update(condition, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne(condition, update);
                if (result.nModified !== 1 || result.nMatched === 1) {
                    throw new Error(`Error updating response: ${result.nModified} updated `);
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
exports.MongoResponseRepository = MongoResponseRepository;
//# sourceMappingURL=mongo-response-repository.js.map