"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const middleware_1 = require("../middleware");
exports.ResponseController = {
    get router() {
        const router = express_1.Router();
        router.post("/", middleware_1.auth, this.record)
            .get("/forms/:form", middleware_1.auth, this.getFormResponses)
            .put("/:response", middleware_1.auth, this.updateContent)
            .put("/process/:response", middleware_1.auth, this.process)
            .delete("/:response", middleware_1.auth, this.delete);
        return router;
    },
    record(req, res, next) {
        req.validateBody(validation_1.ResponseRule.recordResponse);
        const handler = req.container.resolve("recordResponse");
        const serializer = req.container.resolve("responseSerializer");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler.on(SUCCESS, response => {
            res.status(http_status_1.default.CREATED).json(serializer.serialize(response));
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_REQUEST).json({
                type: "DatabaseError",
                details: error.details
            });
        })
            .on(ERROR, next);
        handler.execute(req.body);
    },
    getFormResponses(req, res, next) {
        req.validateParams(validation_1.ResponseRule.getFormResponse);
        const handler = req.container.resolve("getFormResponses");
        const serializer = req.container.resolve("responseSerializer");
        const { SUCCESS, ERROR } = handler.outputs;
        handler.on(SUCCESS, response => {
            res.status(http_status_1.default.CREATED).json(serializer.serialize(response));
        })
            .on(ERROR, next);
        handler.execute(req.params);
    },
    updateContent(req, res, next) {
        req.validateParams(validation_1.ResponseRule.updateContent.response);
        req.validateBody(validation_1.ResponseRule.updateContent.content);
        const handler = req.container.resolve("updateResponseContent");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler.on(SUCCESS, () => {
            res.status(http_status_1.default.OK).json({ updated: true });
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_REQUEST).json({
                type: "DatabaseError",
                details: error.details
            });
        })
            .on(ERROR, next);
        const command = { response: req.params.response, content: req.body.content };
        handler.execute(command);
    },
    process(req, res, next) {
        req.validateParams(validation_1.ResponseRule.processResponse);
        const handler = req.container.resolve("processResponse");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler.on(SUCCESS, () => {
            res.status(http_status_1.default.OK).json({ updated: true });
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_REQUEST).json({
                type: "DatabaseError",
                details: error.details
            });
        })
            .on(ERROR, next);
        const command = {
            response: req.params.response,
            processor: req.user
        };
        handler.execute(command);
    },
    delete(req, res, next) {
        req.validateParams(validation_1.ResponseRule.processResponse);
        const handler = req.container.resolve("deleteResponse");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler.on(SUCCESS, () => {
            res.status(http_status_1.default.OK).json({ deleted: true });
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_REQUEST).json({
                type: "DatabaseError",
                details: error.details
            });
        })
            .on(ERROR, next);
        handler.execute(req.params);
    }
};
//# sourceMappingURL=response-controller.js.map