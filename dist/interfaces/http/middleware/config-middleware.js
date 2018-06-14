"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configMiddleware = (config) => {
    return (req, _res, next) => {
        req.config = config;
        next();
    };
};
//# sourceMappingURL=config-middleware.js.map