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
const domain_1 = require("../../domain");
const operation_1 = require("../operation");
class CreateWorkspace extends operation_1.Operation {
    constructor(workspaceRepository) {
        super();
        this.workspaceRepository = workspaceRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
            try {
                const { name, parent, user } = command;
                const workspace = yield this.workspaceRepository.add(new domain_1.Workspace(name, parent, user, user, false));
                return this.emit(SUCCESS, workspace);
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
exports.CreateWorkspace = CreateWorkspace;
CreateWorkspace.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
//# sourceMappingURL=create-workspace.js.map