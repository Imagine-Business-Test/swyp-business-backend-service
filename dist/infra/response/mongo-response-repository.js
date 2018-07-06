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
    getByForm(form) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model
                .find({ "form._id": form, deleted: false })
                .sort({ createdAt: -1 });
        });
    }
    updateContent(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update({ _id: id }, { $set: { content } });
        });
    }
    makeAsprocessed(id, processor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update({ _id: id }, { $set: { status: "processed", processor } });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update({ _id: id }, { $set: { deleted: true } });
        });
    }
    addNote(id, note, notedBy) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update({ _id: id }, { $set: { note, notedBy, status: "noted" } });
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
    findBStatus(status, page = 1, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = page * limit - limit;
            const countPromise = this.model.count({ status });
            const queryPromise = this.model
                .find({ status })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            const [result, count] = yield Promise.all([queryPromise, countPromise]);
            const pages = Math.ceil(count / limit);
            return { result, count, pages };
        });
    }
    getProcessingActivityStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const match = { $match: { status: "processed" } };
            const group = { $group: { _id: "$processor.name", count: { $sum: 1 } } };
            const total = {
                $group: { _id: null, total: { $sum: 1 }, users: { $push: "$$ROOT" } }
            };
            return this.model.aggregate([match, group, total]);
        });
    }
    getNotingActivityStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const match = { $match: { status: "noted" } };
            const group = { $group: { _id: "$notedBy.name", count: { $sum: 1 } } };
            const total = {
                $group: { _id: null, total: { $sum: 1 }, users: { $push: "$$ROOT" } }
            };
            return this.model.aggregate([match, group, total]);
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