"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const business_1 = require("./business");
const form_1 = require("./form");
const response_1 = require("./response");
const workspace_1 = require("./workspace");
exports.default = (logMiddleware, errorHandler, container, validator, configMiddleware) => {
    const router = express_1.Router();
    router.use(logMiddleware);
    const apiRouter = express_1.Router();
    apiRouter
        .use(cors_1.default())
        .use(container)
        .use(body_parser_1.default.json())
        .use(compression_1.default())
        .use(validator)
        .use(configMiddleware)
        .get("/", (_req, res) => {
        res.send("Welcome to swyp business service API");
    })
        .use("/workspaces", workspace_1.WorkspaceController.router)
        .use("/businesses", business_1.BusinessController.router)
        .use("/responses", response_1.ResponseController.router)
        .use("/forms", form_1.FormController.router);
    router.use("/api/v1", apiRouter).use(errorHandler);
    return router;
};
//# sourceMappingURL=router.js.map