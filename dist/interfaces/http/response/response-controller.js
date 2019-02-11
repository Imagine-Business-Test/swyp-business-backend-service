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
            .post("/addnote/:response", middleware_1.auth, this.addNote)
            .put("/signoff/:response", middleware_1.auth, this.signOff)
            .delete("/:response", middleware_1.auth, this.delete)
            .post("/", this.record);
        return router;
    },
    record(req, res, next) {
        req.validateBody(validation_1.ResponseRule.recordResponse);
        const handler = req.container.resolve("recordResponse");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, () => {
            res.status(http_status_1.default.CREATED).json({ success: true });
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
    signOff(req, res, next) {
        req.validateBody(validation_1.ResponseRule.signOffOfficially);
        req.validateParams(validation_1.ResponseRule.id);
        const handler = req.container.resolve("officialSignoff");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        const command = {
            user: req.user,
            id: req.params.response,
            signatureUrl: req.body.signatureUrl
        };
        handler
            .on(SUCCESS, response => {
            res.status(http_status_1.default.OK).json(response);
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
    getByStatus(req, res, next) {
        req.validateParams(validation_1.ResponseRule.byStatus.params);
        req.validateQuery(validation_1.ResponseRule.byStatus.query);
        const handler = req.container.resolve("getResponseByStatus");
        const serializer = req.container.resolve("responseSerializer");
        const { SUCCESS, ERROR } = handler.outputs;
        const { business, from, to } = req.query;
        const command = from && to
            ? {
                user: req.user,
                limit: req.query.limit || 10,
                page: req.query.page || 1,
                status: req.params.status,
                business,
                from,
                to
            }
            : {
                user: req.user,
                limit: req.query.limit || 10,
                page: req.query.page || 1,
                status: req.params.status,
                business
            };
        handler
            .on(SUCCESS, data => {
            res.status(http_status_1.default.OK).json(serializer.serializeResult(data));
        })
            .on(ERROR, next);
        handler.execute(command);
    },
    addNote(req, res, next) {
        req.validateParams(validation_1.ResponseRule.addNotes.params);
        req.validateBody(validation_1.ResponseRule.addNotes.body);
        const serializer = req.container.resolve("responseSerializer");
        const handler = req.container.resolve("addNoteToResponse");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        const command = {
            note: req.body.note,
            response: req.params.response,
            user: req.user
        };
        handler
            .on(SUCCESS, data => {
            res.status(http_status_1.default.OK).json(serializer.serialize(data));
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
    delete(req, res, next) {
        req.validateParams(validation_1.ResponseRule.id);
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