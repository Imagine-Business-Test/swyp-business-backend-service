"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.FileUploadRule = {
    newAsset: joi_1.default
        .object()
        .keys({
        assetType: joi_1.default
            .string()
            .valid(["signatures", "passports", "official-signatures"])
            .required(),
        bankname: joi_1.default.string().required(),
        name: joi_1.default.string().required()
    })
        .required(),
    logo: joi_1.default
        .object()
        .keys({
        name: joi_1.default.string().required()
    })
        .required()
};
//# sourceMappingURL=fileupload-rules.js.map