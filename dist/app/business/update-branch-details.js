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
class UpdateBranchDetails extends operation_1.Operation {
    constructor(businessRepository) {
        super();
        this.model = businessRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("exec");
            const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
            console.log("origin", command.origin);
            try {
                yield this.model.updateBranch(command.branchId, command.branch);
                const business = yield this.model.findByAccountEmail(command.user.email);
                return this.emit(SUCCESS, { business });
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
exports.UpdateBranchDetails = UpdateBranchDetails;
UpdateBranchDetails.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
//# sourceMappingURL=update-branch-details.js.map