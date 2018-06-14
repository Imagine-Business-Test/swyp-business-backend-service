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
const mongo_workstation_mapper_1 = require("./mongo-workstation-mapper");
class MongoWorkstationRepository {
    constructor(workstationModel) {
        this.model = workstationModel;
    }
    add(workStation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.model.create(mongo_workstation_mapper_1.MongoWorkstationMapper.toDatabase(workStation));
                return mongo_workstation_mapper_1.MongoWorkstationMapper.toEntity(doc);
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
                    throw new Error("The specified workstation record is not found");
                }
                return mongo_workstation_mapper_1.MongoWorkstationMapper.toEntity(doc);
            }
            catch (ex) {
                ex.details = ex.message;
                ex.message = "DatabaseError";
                throw ex;
            }
        });
    }
    findByBusiness(businessId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.find({ business: businessId, deleted: false });
        });
    }
    delete(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.updateOne({ _id: id }, { $set: { deleted: true, lastUpdatedBy: user } });
                if (result.nModified !== 1 || result.nMatched === 1) {
                    throw new Error(`Error deleting workstation: ${result.nModified} deleted `);
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
exports.MongoWorkstationRepository = MongoWorkstationRepository;
//# sourceMappingURL=mongo-workstation-repository.js.map