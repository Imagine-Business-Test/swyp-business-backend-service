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
class GetBusinessWorkstations extends operation_1.Operation {
    constructor(workstationRepository) {
        super();
        this.workstationRepository = workstationRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR } = this.outputs;
            try {
                const workstations = yield this.workstationRepository.findByBusiness(command.business);
                this.emit(SUCCESS, workstations);
            }
            catch (ex) {
                this.emit(ERROR, ex);
            }
        });
    }
}
exports.GetBusinessWorkstations = GetBusinessWorkstations;
GetBusinessWorkstations.setOutputs(["SUCCESS", "ERROR"]);
//# sourceMappingURL=get-business-workstations.js.map