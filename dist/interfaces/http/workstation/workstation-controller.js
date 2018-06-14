"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
const express_1 = require("express");
const middleware_1 = require("../middleware");
const http_status_1 = __importDefault(require("http-status"));
exports.WorkstationController = {
    get router() {
        const router = express_1.Router();
        router.post("/", middleware_1.auth, this.create)
            .get("/getbybusiness/:business", middleware_1.auth, this.getBusinessWorkstations)
            .delete("/:id", middleware_1.auth, this.delete);
        return router;
    },
    create(req, res, next) {
        req.validateBody(validation_1.WorkstationRule.createWorkstation);
        const handler = req.container.resolve("createWorkstation");
        const serializer = req.container.resolve("workstationSerializer");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler.on(SUCCESS, workstation => {
            res.status(http_status_1.default.CREATED).json(serializer.serialize(workstation));
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
    getBusinessWorkstations(req, res, next) {
        req.validateParams(validation_1.WorkstationRule.getBusinessWorkstations);
        const handler = req.container.resolve("getBusinessWorkstations");
        const serializer = req.container.resolve("workstationSerializer");
        const { SUCCESS, ERROR } = handler.outputs;
        handler.on(SUCCESS, workstation => {
            res.status(http_status_1.default.OK).json(serializer.serialize(workstation));
        })
            .on(ERROR, next);
        handler.execute(req.params);
    },
    delete(req, res, next) {
        req.validateParams(validation_1.WorkstationRule.deleteWorkstation);
        const handler = req.container.resolve("deleteWorkstation");
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
            workstation: req.params.id,
            user: req.user
        };
        handler.execute(command);
    }
};
//# sourceMappingURL=workstation-controller.js.map