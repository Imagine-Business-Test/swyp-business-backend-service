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
class GetFormContent extends operation_1.Operation {
    constructor(formRepository) {
        super();
        this.formRepository = formRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
            try {
                const form = yield this.formRepository.fetchContentOf(command);
                return this.emit(SUCCESS, form);
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
exports.GetFormContent = GetFormContent;
GetFormContent.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
//# sourceMappingURL=get-form-content.js.map