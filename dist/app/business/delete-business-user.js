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
class DeleteBusinessUser extends operation_1.Operation {
    constructor(businessRepository) {
        super();
        this.businessRepository = businessRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
            try {
                yield this.businessRepository.deleteAccount(command.email, command.modifier);
                this.emit(SUCCESS, { deleted: true });
            }
            catch (ex) {
                if (ex.message === "DatabaseError") {
                    this.emit(DATABASE_ERROR, ex);
                }
                this.emit(ERROR, ex);
            }
        });
    }
}
exports.DeleteBusinessUser = DeleteBusinessUser;
DeleteBusinessUser.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
//# sourceMappingURL=delete-business-user.js.map