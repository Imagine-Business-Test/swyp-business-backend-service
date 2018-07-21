"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.ResponseRule = {
    recordResponse: joi_1.default
        .object()
        .keys({
        content: joi_1.default.object().required(),
        form: joi_1.default.string().required(),
        user: joi_1.default
            .object()
            .keys({
            id: joi_1.default.string().required(),
            email: joi_1.default.string().email(),
            firstname: joi_1.default.string().required(),
            lastname: joi_1.default.string().required(),
            middlename: joi_1.default.string(),
            phone: joi_1.default.string().required()
        })
            .required()
    })
        .required(),
    updateContent: {
        content: joi_1.default
            .object()
            .keys({
            content: joi_1.default.string().required()
        })
            .required(),
        response: joi_1.default
            .object()
            .keys({
            response: joi_1.default.string().required()
        })
            .required()
    },
    getFormResponse: joi_1.default
        .object()
        .keys({
        form: joi_1.default.string().required()
    })
        .required(),
    processResponse: joi_1.default
        .object()
        .keys({
        response: joi_1.default.string().required()
    })
        .required(),
    deleteResponse: joi_1.default
        .object()
        .keys({
        response: joi_1.default.string().required()
    })
        .required(),
    byStatus: {
        params: joi_1.default
            .object()
            .keys({
            status: joi_1.default.string().required()
        })
            .required(),
        query: joi_1.default
            .object()
            .keys({
            business: joi_1.default.string().required(),
            limit: joi_1.default.number(),
            page: joi_1.default.number()
        })
            .required()
    },
    addNotes: {
        body: joi_1.default
            .object()
            .keys({
            note: joi_1.default.string().required()
        })
            .required(),
        params: joi_1.default
            .object()
            .keys({
            response: joi_1.default.string().required()
        })
            .required()
    }
};
//# sourceMappingURL=response-validation.js.map