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
class GetWorkspaces extends operation_1.Operation {
    constructor(workspaceRepository) {
        super();
        this.workspaceRepository = workspaceRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR } = this.outputs;
            try {
                const items = yield this.workspaceRepository.fetchAll();
                const workspaces = {};
                items.forEach((item) => {
                    if (!workspaces.hasOwnProperty(item._id)) {
                        workspaces[item._id] = item.entry;
                    }
                });
                this.emit(SUCCESS, workspaces);
            }
            catch (ex) {
                this.emit(ERROR, ex);
            }
        });
    }
}
exports.GetWorkspaces = GetWorkspaces;
GetWorkspaces.setOutputs(["SUCCESS", "ERROR"]);
//# sourceMappingURL=get-workspaces.js.map