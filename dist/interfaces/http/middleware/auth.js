"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.auth = (req, res, next) => {
    let token = req.get("Authorization");
    if (!token) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            details: "Authorization token not passed",
            type: "ValidationError"
        });
    }
    try {
        token = token.replace("Bearer: ", "");
        const user = (req.user = jsonwebtoken_1.default.verify(token, req.config.web.json_secret));
        if (!user.isBusiness) {
            throw new Error("AuthorizationError");
        }
        return next();
    }
    catch (ex) {
        if (ex.message === "AuthorizationError") {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                details: "Access Denied",
                type: "AuthorizationError"
            });
        }
        return res.status(http_status_1.default.UNAUTHORIZED).json({
            details: ex.message,
            type: "InvalidateToken"
        });
    }
};
//# sourceMappingURL=auth.js.map