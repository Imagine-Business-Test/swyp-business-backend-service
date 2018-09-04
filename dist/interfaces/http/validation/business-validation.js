"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.BusinessRule = {
    createBusiness: joi_1.default
        .object()
        .keys({
        account: joi_1.default
            .object()
            .keys({
            email: joi_1.default
                .string()
                .email()
                .required(),
            name: joi_1.default.string().required(),
            branch: joi_1.default.string().required(),
            password: joi_1.default
                .string()
                .min(8)
                .required(),
            phone: joi_1.default.string().required(),
            role: joi_1.default
                .string()
                .allow(["worker", "admin"])
                .label("User role")
                .required()
        })
            .required(),
        name: joi_1.default.string().required(),
        branches: joi_1.default.array().items(joi_1.default.object().keys({
            name: joi_1.default.string().required(),
            area: joi_1.default.string().required(),
            state: joi_1.default.string().required(),
            address: joi_1.default.string().required()
        }))
    })
        .required(),
    addBusinessUser: joi_1.default
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
    loginBusinessUser: joi_1.default
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
        .required(),
    deleteBusinessUser: joi_1.default
        .object()
        .keys({
        email: joi_1.default
            .string()
            .email()
            .required()
    })
        .required(),
    resetPassword: joi_1.default
        .object()
        .keys({
        password: joi_1.default
            .string()
            .min(8)
            .required(),
        token: joi_1.default.string().required()
    })
        .required()
};
//# sourceMappingURL=business-validation.js.map