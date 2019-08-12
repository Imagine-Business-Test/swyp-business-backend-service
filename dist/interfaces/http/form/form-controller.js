"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("../validation");
const middleware_1 = require("../middleware");
const http_status_1 = __importDefault(require("http-status"));
exports.FormController = {
    get router() {
        const router = express_1.Router();
        router
            .get("/workspaces/:workspace/:businessId", this.getWorkspaceForms)
            .get("/businesses/:business/:parent/:formtype", this.getBusinessForms)
            .get("/:biz/:parent/:formType/:form", this.getFormContent)
            .put("/disable/:form", middleware_1.auth, this.disable)
            .delete("/:form", middleware_1.auth, this.delete)
            .post("/", middleware_1.auth, this.create)
            .put("/", middleware_1.auth, this.updateContent);
        return router;
    },
    create(req, res, next) {
        req.validateBody(validation_1.FormRules.createForm);
        const handler = req.container.resolve("createForm");
        const serializer = req.container.resolve("formSerializer");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, form => {
            res.status(http_status_1.default.CREATED).json(serializer.serialize(form));
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_GATEWAY).json({
                type: "DatabaseError",
                details: error.details
            });
        })
            .on(ERROR, next);
        const command = Object.assign({}, req.body, { user: req.user });
        handler.execute(command);
    },
    update(req, res, next) {
        req.validateBody(validation_1.FormRules.createForm);
        const handler = req.container.resolve("createForm");
        const serializer = req.container.resolve("formSerializer");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, form => {
            res.status(http_status_1.default.CREATED).json(serializer.serialize(form));
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_GATEWAY).json({
                type: "DatabaseError",
                details: error.details
            });
        })
            .on(ERROR, next);
        const command = Object.assign({}, req.body, { user: req.user });
        handler.execute(command);
    },
    getWorkspaceForms(req, res, next) {
        req.validateParams(validation_1.FormRules.getWorkspaceForms);
        const handler = req.container.resolve("getWorkspaceForms");
        const serializer = req.container.resolve("formSerializer");
        const { SUCCESS, ERROR } = handler.outputs;
        handler
            .on(SUCCESS, forms => {
            res.status(http_status_1.default.OK).json(serializer.serialize(forms));
        })
            .on(ERROR, next);
        handler.execute(req.params);
    },
    getBusinessForms(req, res, next) {
        req.validateParams(validation_1.FormRules.getABusinessForms);
        const handler = req.container.resolve("getBusinessForms");
        const serializer = req.container.resolve("formSerializer");
        const { SUCCESS, ERROR } = handler.outputs;
        handler
            .on(SUCCESS, forms => {
            res.status(http_status_1.default.OK).json(serializer.serialize(forms));
        })
            .on(ERROR, next);
        handler.execute(req.params);
    },
    getFormContent(req, res, next) {
        req.validateParams(validation_1.FormRules.getContentOf);
        const handler = req.container.resolve("getFormContent");
        const serializer = req.container.resolve("formSerializer");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, form => {
            res.status(http_status_1.default.OK).json(serializer.forBusiness(form));
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_GATEWAY).json({
                type: "DatabaseError",
                details: error.details
            });
        })
            .on(ERROR, next);
        const command = {
            formTypeParent: req.params.parent,
            formType: req.params.formType,
            businessSlug: req.params.biz,
            formSlug: req.params.form
        };
        handler.execute(command);
    },
    disable(req, res, next) {
        req.validateParams(validation_1.FormRules.disableForm);
        const handler = req.container.resolve("disableForm");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, () => {
            res.status(http_status_1.default.OK).json({ updated: true });
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_GATEWAY).json({
                type: "DatabaseError",
                details: error.details
            });
        })
            .on(ERROR, next);
        handler.execute(req.params);
    },
    delete(req, res, next) {
        req.validateParams(validation_1.FormRules.disableForm);
        const handler = req.container.resolve("deleteForm");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, () => {
            res.status(http_status_1.default.OK).json({ deleted: true });
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_GATEWAY).json({
                type: "DatabaseError",
                details: error.details
            });
        })
            .on(ERROR, next);
        handler.execute(req.params);
    },
    updateContent(req, res, next) {
        req.validateBody(validation_1.FormRules.updateContent);
        const handler = req.container.resolve("updateFormContent");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, () => {
            res.status(http_status_1.default.OK).json({ updated: true });
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_GATEWAY).json({
                type: "DatabaseError",
                details: error.details
            });
        })
            .on(ERROR, next);
        const command = {
            form: req.body.formId,
            content: req.body.elements,
            modifier: req.user
        };
        handler.execute(command);
    }
};
//# sourceMappingURL=form-controller.js.map