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
const operation_1 = require("../operation");
class CreateWorkstation extends operation_1.Operation {
    constructor(workstationRepository, businessRepository) {
        super();
        this.workStationRepository = workstationRepository;
        this.businessRepository = businessRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
            try {
                const { name, user } = command;
                const business = yield this.businessRepository.findByAccountEmail(user.email);
                const workStation = yield this.workStationRepository.add(business.createWorkStation(name));
                return this.emit(SUCCESS, workStation);
            }
            catch (ex) {
                if (ex.message === "DatabaseError") {
                    return this.emit(DATABASE_ERROR, ex);
                }
                return this.emit(ERROR, ex);
            }
        });
    }
}
exports.CreateWorkstation = CreateWorkstation;
CreateWorkstation.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
//# sourceMappingURL=create-workstation.js.map