"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default
    .object()
    .keys({
    PORT: joi_1.default.string().required(),
    PROCESS_TYPE: joi_1.default
        .string()
        .allow(["web"])
        .required(),
    NODE_ENV: joi_1.default
        .string()
        .allow(["development", "production", "test"])
        .required()
})
    .unknown()
    .required();
const { error, value } = joi_1.default.validate(process.env, schema);
if (error) {
    throw new Error(`Config validation failed ${error.message}`);
}
exports.commons = {
    process: {
        env: value.NODE_ENV,
        port: value.PORT,
        type: value.PROCESS_TYPE
    }
};
//# sourceMappingURL=commons.js.map