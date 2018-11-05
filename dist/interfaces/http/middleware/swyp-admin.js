"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
exports.swypAdmin = (req, res, next) => {
    const user = req.user;
    if (user.role !== "admin") {
        return res.status(http_status_1.default.UNAUTHORIZED).json({
            details: "Access Denied",
            type: "AuthorizationError"
        });
    }
    return next();
};
//# sourceMappingURL=swyp-admin.js.map