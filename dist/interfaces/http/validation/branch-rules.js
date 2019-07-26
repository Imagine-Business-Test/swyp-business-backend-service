"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.BranchRules = {
    resetPassword: joi_1.default
        .object()
        .keys({
        password: joi_1.default
            .string()
            .min(8)
            .required(),
        token: joi_1.default.string().required()
    })
        .required(),
    addBranch: joi_1.default
        .object()
        .keys({
        name: joi_1.default.string().required(),
        area: joi_1.default.string().required(),
        state: joi_1.default.string().required(),
        origin: joi_1.default.string().required(),
        business: joi_1.default.string().required(),
        stateId: joi_1.default.string().required(),
        address: joi_1.default.string().required(),
        updatedAt: joi_1.default.date(),
        created: joi_1.default.date(),
        deleted: joi_1.default.boolean()
    })
        .required(),
    deleteBranch: joi_1.default
        .object()
        .keys({
        name: joi_1.default.string().required()
    })
        .required(),
    loginUser: joi_1.default
        .object()
        .keys({
        email: joi_1.default
            .string()
            .email()
            .required(),
        password: joi_1.default
            .string()
            .min(8)
            .required()
    })
        .required(),
    requestPasswordReset: joi_1.default
        .object()
        .keys({
        email: joi_1.default
            .string()
            .email()
            .required(),
        origin: joi_1.default
            .string()
            .required()
            .label("Origin to redirect user is missing")
    })
        .required()
};
//# sourceMappingURL=branch-rules.js.map