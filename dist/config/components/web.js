"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default
    .object()
    .keys({
    JSON_SECRET: joi_1.default.string().required()
})
    .unknown()
    .required();
const { error, value } = joi_1.default.validate(process.env, schema);
if (error) {
    throw new Error(`config validation failed: ${error.message}`);
}
exports.web = {
    json_secret: value.JSON_SECRET
};
//# sourceMappingURL=web.js.map