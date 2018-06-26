"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.BusinessRule = {
    createBusiness: joi_1.default.object().keys({
        name: joi_1.default.string().required(),
        logoUrl: joi_1.default.string().required(),
        account: joi_1.default.object().keys({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(8).required(),
            name: joi_1.default.string().required(),
            phone: joi_1.default.string().required()
        }).required()
    }).required(),
    addBusinessUser: joi_1.default.object().keys({
        business: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).required(),
        name: joi_1.default.string().required(),
        phone: joi_1.default.string().required()
    }).required(),
    loginBusinessUser: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).required()
    }).required(),
    requestPasswordReset: joi_1.default.object().keys({
        origin: joi_1.default.string().required().label("Origin to redirect user is missing"),
        email: joi_1.default.string().email().required()
    }).required(),
    deleteBusinessUser: joi_1.default.object().keys({
        email: joi_1.default.string().email().required()
    }).required(),
    resetPassword: joi_1.default.object().keys({
        token: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).required()
    }).required()
};
//# sourceMappingURL=business-validation.js.map