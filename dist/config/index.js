"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.load();
const processType = process.env.PROCESS_TYPE || "web";
let env;
try {
    env = require(`./${processType}`);
}
catch (exception) {
    if (exception.code === " MODULE_NOT_FOUND") {
        throw new Error(`No config for process type: ${processType}`);
    }
    throw exception;
}
exports.default = env;
//# sourceMappingURL=index.js.map