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
class GetSimilarForms extends operation_1.Operation {
    constructor(formRepository) {
        super();
        this.formRepository = formRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR } = this.outputs;
            try {
                const formRecords = yield this.formRepository.getByBusiness(command.business);
                this.emit(SUCCESS, formRecords);
            }
            catch (error) {
                this.emit(ERROR, error);
            }
        });
    }
}
exports.GetSimilarForms = GetSimilarForms;
GetSimilarForms.setOutputs(["SUCCESS", "ERROR"]);
//# sourceMappingURL=get-similar-forms.js.map