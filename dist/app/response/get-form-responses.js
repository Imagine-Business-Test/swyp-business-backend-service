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
class GetFormResponses extends operation_1.Operation {
    constructor(responseRepository) {
        super();
        this.responseRepository = responseRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR } = this.outputs;
            try {
                const responses = yield this.responseRepository.getByForm(command.form);
                return this.emit(SUCCESS, responses);
            }
            catch (ex) {
                return this.emit(ERROR, ex);
            }
        });
    }
}
exports.GetFormResponses = GetFormResponses;
GetFormResponses.setOutputs(["SUCCESS", "ERROR"]);
//# sourceMappingURL=get-form-responses.js.map