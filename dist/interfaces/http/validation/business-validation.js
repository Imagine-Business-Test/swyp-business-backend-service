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
            firstname: joi_1.default.string().required(),
            lastname: joi_1.default.string().required(),
            branch: joi_1.default.string().required(),
            password: joi_1.default
                .string()
                .min(8)
                .required(),
            phone: joi_1.default.string().required(),
            role: joi_1.default
                .string()
                .valid(["admin", "initiator", "approver"])
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
    updateBranch: joi_1.default
        .object()
        .keys({
        userId: joi_1.default.string().required(),
        branch: joi_1.default.string().required()
    })
        .required(),
    updateDetails: joi_1.default
        .object()
        .keys({
        id: joi_1.default.string().required(),
        logoUrl: joi_1.default.string().required(),
        description: joi_1.default.string().required()
    })
        .required()
};
//# sourceMappingURL=business-validation.js.map