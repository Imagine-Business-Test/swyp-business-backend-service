"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default
    .object()
    .keys({
    AWS_ACCESS_KEY: joi_1.default.string().required(),
    AWS_SECRET_KEY: joi_1.default.string().required()
})
    .unknown()
    .required();
const { error, value } = joi_1.default.validate(process.env, schema);
if (error) {
    throw new Error(`Config validation failed ${error.message}`);
}
exports.AWS = {
    secretAccessKey: value.AWS_SECRET_KEY,
    accessKeyId: value.AWS_ACCESS_KEY
};
//# sourceMappingURL=aws.js.map