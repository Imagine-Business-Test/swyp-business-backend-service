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
const mongo_workspace_mapper_1 = require("./mongo-workspace-mapper");
class MongoWorkspaceRepository {
    constructor(workspaceModel) {
        this.model = workspaceModel;
    }
    add(workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.model.create(mongo_workspace_mapper_1.MongoWorkspaceMapper.toDatabase(workspace));
                return mongo_workspace_mapper_1.MongoWorkspaceMapper.toEntity(doc);
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
                    throw new Error("The specified workspace record is not found");
                }
                return mongo_workspace_mapper_1.MongoWorkspaceMapper.toEntity(doc);
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const matchTransformation = { $match: { deleted: false } };
            const groupTransformation = {
                $group: {
                    _id: "$parent",
                    entry: { $push: { parent: "$parent", name: "$name", id: "$_id" } }
                }
            };
            return this.model.aggregate([matchTransformation, groupTransformation]);
        });
    }
    delete(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne({ _id: id }, { $set: { deleted: true, lastUpdatedBy: user } });
                if (result.nModified !== 1) {
                    throw new Error(`Error deleting workspace: ${result.nModified} deleted `);
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
exports.MongoWorkspaceRepository = MongoWorkspaceRepository;
//# sourceMappingURL=mongo-workspace-repository.js.map