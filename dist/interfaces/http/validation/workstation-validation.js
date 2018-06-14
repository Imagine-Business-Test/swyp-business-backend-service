"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.WorkstationRule = {
    createWorkstation: joi_1.default.object().keys({
        business: joi_1.default.string().required(),
        name: joi_1.default.string().required()
    }).required(),
    deleteWorkstation: joi_1.default.object().keys({
        id: joi_1.default.string().required()
    }).required(),
    getBusinessWorkstations: joi_1.default.object().keys({
        business: joi_1.default.string().required()
    }).required()
};
//# sourceMappingURL=workstation-validation.js.map