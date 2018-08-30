"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.FormRules = {
    createForm: joi_1.default
        .object()
        .keys({
        name: joi_1.default.string().required(),
        content: joi_1.default.string().required(),
        workspace: joi_1.default.string().required(),
        elementCount: joi_1.default.number().required()
    })
        .required(),
    deleteForm: joi_1.default
        .object()
        .keys({
        form: joi_1.default.string().required()
    })
        .required(),
    updateContent: {
        content: joi_1.default
            .object()
            .keys({
            content: joi_1.default.string().required()
        })
            .required(),
        form: joi_1.default
            .object()
            .keys({
            form: joi_1.default.string().required()
        })
            .required()
    },
    disableForm: joi_1.default
        .object()
        .keys({
        form: joi_1.default.string().required()
    })
        .required(),
    getABusinessForms: joi_1.default
        .object()
        .keys({
        business: joi_1.default.string().required()
    })
        .required(),
    getWorkspaceForms: joi_1.default
        .object()
        .keys({
        workspace: joi_1.default.string().required()
    })
        .required()
};
//# sourceMappingURL=form-validation.js.map