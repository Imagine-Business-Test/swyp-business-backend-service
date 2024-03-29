"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.WorkspaceRule = {
    createWorkspace: joi_1.default
        .object()
        .keys({
        name: joi_1.default.string().required(),
        parent: joi_1.default
            .string()
            .allow(["Individual", "Corporate"])
            .required()
    })
        .required(),
    deleteWorkspace: joi_1.default
        .object()
        .keys({
        id: joi_1.default.string().required()
    })
        .required()
};
//# sourceMappingURL=workspace-validation.js.map