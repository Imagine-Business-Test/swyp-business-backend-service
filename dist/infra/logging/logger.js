"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
exports.Logger = (config) => {
    log4js_1.default.configure(config.logging);
    return log4js_1.default.getLogger();
};
//# sourceMappingURL=logger.js.map