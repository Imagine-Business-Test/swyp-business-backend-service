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
class OfficialSignoff extends operation_1.Operation {
    constructor(responseRepository) {
        super();
        this.repository = responseRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
            try {
                const { user, signatureUrl, id } = command;
                const processor = Object.assign({}, user, { signatureUrl });
                const doc = yield this.repository.updateProcessors(id, processor);
                return this.emit(SUCCESS, doc);
            }
            catch (error) {
                if (error.message === "DatabaseError") {
                    return this.emit(DATABASE_ERROR, error);
                }
                return this.emit(ERROR, error);
            }
        });
    }
}
exports.OfficialSignoff = OfficialSignoff;
OfficialSignoff.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
//# sourceMappingURL=official-signoff.js.map