"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
exports.errorHandler = (err, _req, res, _next) => {
    if (err.message === "ValidationError") {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            type: "ValidationError",
            message: err.details
        });
    }
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        type: "InternalServerError",
        message: "The server failed to handle the request"
    });
};
//# sourceMappingURL=error-handler.js.map