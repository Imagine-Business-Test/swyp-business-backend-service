"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logging_1 = require("../../../infra/logging");
exports.logMiddleware = (logger) => {
    return morgan_1.default("dev", {
        stream: logging_1.LogStream.toStream(logger)
    });
};
//# sourceMappingURL=log-middleware.js.map