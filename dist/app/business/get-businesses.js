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
class GetBusinesses extends operation_1.Operation {
    constructor(businessRepository) {
        super();
        this.businessRepository = businessRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR } = this.outputs;
            try {
                const businesses = yield this.businessRepository.fetchAll();
                this.emit(SUCCESS, businesses);
            }
            catch (error) {
                this.emit(ERROR, error);
            }
        });
    }
}
exports.GetBusinesses = GetBusinesses;
GetBusinesses.setOutputs(["SUCCESS", "ERROR"]);
//# sourceMappingURL=get-businesses.js.map