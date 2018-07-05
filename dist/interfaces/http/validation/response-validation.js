"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.ResponseRule = {
    recordResponse: joi_1.default.object().keys({
        form: joi_1.default.object().keys({
            workspace: joi_1.default.string().required(),
            business: joi_1.default.string().required(),
            _id: joi_1.default.string().required(),
        }).required(),
        content: joi_1.default.string().required(),
        user: joi_1.default.object().keys({
            _id: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
            firstname: joi_1.default.string().required(),
            lastname: joi_1.default.string().required(),
            phone: joi_1.default.string().required(),
            middlename: joi_1.default.string()
        }).required(),
    }).required(),
    updateContent: {
        content: joi_1.default.object().keys({
            content: joi_1.default.string().required(),
        }).required(),
        response: joi_1.default.object().keys({
            response: joi_1.default.string().required(),
        }).required()
    },
    getFormResponse: joi_1.default.object().keys({
        form: joi_1.default.string().required()
    }).required(),
    processResponse: joi_1.default.object().keys({
        response: joi_1.default.string().required()
    }).required(),
    deleteResponse: joi_1.default.object().keys({
        response: joi_1.default.string().required()
    }).required(),
    byStatus: {
        params: joi_1.default.object().keys({
            status: joi_1.default.string().required()
        }).required(),
        query: joi_1.default.object().keys({
            page: joi_1.default.number(),
            limit: joi_1.default.number()
        }).required()
    },
    addNotes: {
        params: joi_1.default.object().keys({
            response: joi_1.default.string().required()
        }).required(),
        body: joi_1.default.object().keys({
            note: joi_1.default.string().required()
        }).required()
    }
};
//# sourceMappingURL=response-validation.js.map