"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.UserRules = {
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
    addUser: joi_1.default
        .object()
        .keys({
        business: joi_1.default.string().required(),
        branch: joi_1.default.string().required(),
        role: joi_1.default
            .string()
            .required()
            .allow(["admin", "worker"])
            .label("User role"),
        email: joi_1.default
            .string()
            .email()
            .required(),
        origin: joi_1.default
            .string()
            .required()
            .label("Url to redirect user"),
        name: joi_1.default.string().required(),
        phone: joi_1.default.string().required()
    })
        .required(),
    deleteUser: joi_1.default
        .object()
        .keys({
        email: joi_1.default
            .string()
            .email()
            .required()
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
//# sourceMappingURL=user-rules.js.map