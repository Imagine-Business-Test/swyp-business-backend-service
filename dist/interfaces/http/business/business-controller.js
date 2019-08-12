"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
const middleware_1 = require("../middleware");
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
exports.BusinessController = {
    get router() {
        const router = express_1.Router();
        router
            .get("/", this.all)
            .put("/updateuser", middleware_1.auth, middleware_1.admin, this.updateUser)
            .put("/updatedetails", middleware_1.auth, middleware_1.admin, this.updateDetails)
            .post("/", this.create);
        return router;
    },
    all(req, res, next) {
        const handler = req.container.resolve("getBusinesses");
        const serializer = req.container.resolve("businessSerializer");
        const { SUCCESS, ERROR } = handler.outputs;
        handler
            .on(SUCCESS, data => {
            res.status(http_status_1.default.OK).json(serializer.lean(data));
        })
            .on(ERROR, next);
        handler.execute();
    },
    create(req, res, next) {
        req.validateBody(validation_1.BusinessRule.createBusiness);
        const handler = req.container.resolve("createBusiness");
        const serializer = req.container.resolve("businessSerializer");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, biz => {
            res.status(http_status_1.default.CREATED).json(serializer.serialize(biz));
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_GATEWAY).json({
                details: error.details,
                type: "DatabaseError"
            });
        })
            .on(ERROR, next);
        handler.execute(req.body);
    },
    updateUser(req, res, next) {
        req.validateBody(validation_1.BusinessRule.updateBranch);
        const handler = req.container.resolve("updateUserDetails");
        const serializer = req.container.resolve("businessSerializer");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, resp => {
            res.status(http_status_1.default.OK).json(serializer.serialize(resp));
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_REQUEST).json({
                details: error.details,
                type: "DatabaseError"
            });
        })
            .on(ERROR, next);
        const command = {
            userId: req.body.id,
            branch: req.body.branch,
            user: req.user,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            role: req.body.role
        };
        handler.execute(command);
    },
    updateDetails(req, res, next) {
        req.validateBody(validation_1.BusinessRule.updateDetails);
        const handler = req.container.resolve("updateBusinessDetails");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, resp => {
            res.status(http_status_1.default.OK).json(resp);
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_REQUEST).json({
                details: error.details,
                type: "DatabaseError"
            });
        })
            .on(ERROR, next);
        const command = {
            id: req.body.id,
            logoUrl: req.body.logoUrl,
            description: req.body.description,
            user: req.user
        };
        handler.execute(command);
    }
};
//# sourceMappingURL=business-controller.js.map