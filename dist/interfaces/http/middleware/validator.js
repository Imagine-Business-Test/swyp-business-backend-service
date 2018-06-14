"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function validateBody(req, rule) {
    validate(req.body, rule);
}
function validateParams(req, rule) {
    validate(req.params, rule);
}
function validateQuery(req, rule) {
    validate(req.query, rule);
}
function validate(obj, rule) {
    const result = joi_1.default.validate(obj, rule, { abortEarly: false });
    if (result.error) {
        result.error.message = "ValidationError";
        throw result.error;
    }
}
exports.validator = (req, _res, next) => {
    req.validateBody = validateBody.bind(null, req);
    req.validateParams = validateParams.bind(null, req);
    req.validateQuery = validateQuery.bind(null, req);
    next();
};
//# sourceMappingURL=validator.js.map