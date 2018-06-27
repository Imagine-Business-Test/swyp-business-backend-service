"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
const express_1 = require("express");
const middleware_1 = require("../middleware");
const http_status_1 = __importDefault(require("http-status"));
exports.WorkspaceController = {
    get router() {
        const router = express_1.Router();
        router.post("/", middleware_1.auth, this.create)
            .get("/getbybusiness/:business", middleware_1.auth, this.getBusinessWorkspaces)
            .delete("/:id", middleware_1.auth, this.delete);
        return router;
    },
    create(req, res, next) {
        req.validateBody(validation_1.WorkspaceRule.createWorkspace);
        const handler = req.container.resolve("createWorkspace");
        const serializer = req.container.resolve("workspaceSerializer");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler.on(SUCCESS, workspace => {
            res.status(http_status_1.default.CREATED).json(serializer.serialize(workspace));
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_GATEWAY).json({
                type: "DatabaseError",
                details: error.details
            });
        })
            .on(ERROR, next);
        const command = {
            businessId: req.body.business,
            name: req.body.name,
            user: req.user
        };
        handler.execute(command);
    },
    getBusinessWorkspaces(req, res, next) {
        req.validateParams(validation_1.WorkspaceRule.getBusinessWorkspaces);
        const handler = req.container.resolve("getBusinessWorkspaces");
        const serializer = req.container.resolve("workspaceSerializer");
        const { SUCCESS, ERROR } = handler.outputs;
        handler.on(SUCCESS, workspace => {
            res.status(http_status_1.default.OK).json(serializer.serialize(workspace));
        })
            .on(ERROR, next);
        handler.execute(req.params);
    },
    delete(req, res, next) {
        req.validateParams(validation_1.WorkspaceRule.deleteWorkspace);
        const handler = req.container.resolve("deleteWorkspace");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler.on(SUCCESS, () => {
            res.status(http_status_1.default.OK).json({ deleted: true });
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_GATEWAY).json({
                type: "DatabaseError",
                details: error.details
            });
        })
            .on(ERROR, next);
        const command = {
            workspace: req.params.id,
            user: req.user
        };
        handler.execute(command);
    }
};
//# sourceMappingURL=workspace-controller.js.map