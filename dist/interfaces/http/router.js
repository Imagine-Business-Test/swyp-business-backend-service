"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workstation_1 = require("./workstation");
const business_1 = require("./business");
const response_1 = require("./response");
const form_1 = require("./form");
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
exports.default = (logMiddleware, errorHandler, container, validator, configMiddleware) => {
    const router = express_1.Router();
    router.use(logMiddleware);
    const apiRouter = express_1.Router();
    apiRouter.use(cors_1.default())
        .use(container)
        .use(body_parser_1.default.json())
        .use(compression_1.default())
        .use(validator)
        .use(configMiddleware)
        .get("/", (_req, res) => {
        res.send("Welcome to swyp business API");
    })
        .use("/workstations", workstation_1.WorkstationController.router)
        .use("/businesses", business_1.BusinessController.router)
        .use("/responses", response_1.ResponseController.router)
        .use("/forms", form_1.FormController.router);
    router.use("/api/v1", apiRouter)
        .use(errorHandler);
    return router;
};
//# sourceMappingURL=router.js.map