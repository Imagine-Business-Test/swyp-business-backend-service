"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const middleware_1 = require("../middleware");
const validation_1 = require("../validation");
exports.ResponseController = {
    get router() {
        const router = express_1.Router();
        router
            .get("/bystatus/:status", middleware_1.auth, this.getByStatus)
            .get("/forms/:form", middleware_1.auth, this.getFormResponses)
            .put("/process/:response", middleware_1.auth, this.process)
            .post("/addnote/:response", middleware_1.auth, this.addNote)
            .put("/:response", middleware_1.auth, this.updateContent)
            .delete("/:response", middleware_1.auth, this.delete)
            .post("/", middleware_1.auth, this.record);
        return router;
    },
    record(req, res, next) {
        req.validateBody(validation_1.ResponseRule.recordResponse);
        const handler = req.container.resolve("recordResponse");
        const serializer = req.container.resolve("responseSerializer");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, response => {
            res.status(http_status_1.default.CREATED).json(serializer.serialize(response));
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_REQUEST).json({
                details: error.details,
                type: "DatabaseError"
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
        handler
            .on(SUCCESS, response => {
            res.status(http_status_1.default.CREATED).json(serializer.serialize(response));
        })
            .on(ERROR, next);
        handler.execute(req.params);
    },
    getByStatus(req, res, next) {
        req.validateParams(validation_1.ResponseRule.byStatus.params);
        req.validateQuery(validation_1.ResponseRule.byStatus.query);
        const handler = req.container.resolve("getResponseByStatus");
        const { SUCCESS, ERROR } = handler.outputs;
        const command = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            status: req.params.status
        };
        handler
            .on(SUCCESS, data => {
            res.status(http_status_1.default.OK).json(data);
        })
            .on(ERROR, next);
        handler.execute(command);
    },
    addNote(req, res, next) {
        req.validateParams(validation_1.ResponseRule.addNotes.params);
        req.validateBody(validation_1.ResponseRule.addNotes.body);
        const handler = req.container.resolve("addNoteToResponse");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        const command = {
            note: req.body.note,
            response: req.params.response,
            user: req.user
        };
        handler
            .on(SUCCESS, data => {
            res.status(http_status_1.default.OK).json(data);
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
                details: error.details,
                type: "DatabaseError"
            });
        })
            .on(ERROR, next);
        handler.execute(command);
    },
    updateContent(req, res, next) {
        req.validateParams(validation_1.ResponseRule.updateContent.response);
        req.validateBody(validation_1.ResponseRule.updateContent.content);
        const handler = req.container.resolve("updateResponseContent");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, () => {
            res.status(http_status_1.default.OK).json({ updated: true });
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_REQUEST).json({
                details: error.details,
                type: "DatabaseError"
            });
        })
            .on(ERROR, next);
        const command = {
            content: req.body.content,
            response: req.params.response
        };
        handler.execute(command);
    },
    process(req, res, next) {
        req.validateParams(validation_1.ResponseRule.processResponse);
        const handler = req.container.resolve("processResponse");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, () => {
            res.status(http_status_1.default.OK).json({ updated: true });
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_REQUEST).json({
                details: error.details,
                type: "DatabaseError"
            });
        })
            .on(ERROR, next);
        const command = {
            processor: req.user,
            response: req.params.response
        };
        handler.execute(command);
    },
    delete(req, res, next) {
        req.validateParams(validation_1.ResponseRule.processResponse);
        const handler = req.container.resolve("deleteResponse");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, () => {
            res.status(http_status_1.default.OK).json({ deleted: true });
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_REQUEST).json({
                details: error.details,
                type: "DatabaseError"
            });
        })
            .on(ERROR, next);
        handler.execute(req.params);
    }
};
//# sourceMappingURL=response-controller.js.map