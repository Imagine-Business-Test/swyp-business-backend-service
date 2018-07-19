"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const middleware_1 = require("../middleware");
const validation_1 = require("../validation");
exports.BusinessController = {
    get router() {
        const router = express_1.Router();
        router
            .get("/", this.all)
            .post("/requestpasswordrest", this.requestPasswordRest)
            .post("/deleteuser", middleware_1.auth, middleware_1.admin, this.deleteUser)
            .post("/resetpassword", this.resetPassword)
            .post("/adduser", middleware_1.auth, middleware_1.admin, this.addUser)
            .post("/loginuser", this.loginUser)
            .get("/stats", middleware_1.auth, this.getStats)
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
    addUser(req, res, next) {
        req.validateBody(validation_1.BusinessRule.addBusinessUser);
        const handler = req.container.resolve("addBusinessUser");
        const serializer = req.container.resolve("businessSerializer");
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
        const command = {
            account: {
                email: req.body.email,
                name: req.body.name,
                phone: req.body.phone,
                role: req.body.role
            },
            origin: req.body.origin,
            user: req.user,
            businessId: req.body.business
        };
        handler.execute(command);
    },
    loginUser(req, res, next) {
        req.validateBody(validation_1.BusinessRule.loginBusinessUser);
        const handler = req.container.resolve("loginBusinessUser");
        const serializer = req.container.resolve("businessSerializer");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, response => {
            res.status(http_status_1.default.OK).json(serializer.serialize(response));
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
    deleteUser(req, res, next) {
        req.validateBody(validation_1.BusinessRule.deleteBusinessUser);
        const handler = req.container.resolve("deleteBusinessUser");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, response => {
            res.status(http_status_1.default.OK).json(response);
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_REQUEST).json({
                details: error.details,
                type: "DatabaseError"
            });
        })
            .on(ERROR, next);
        const command = { email: req.body.email, modifier: req.user };
        handler.execute(command);
    },
    requestPasswordRest(req, res, next) {
        req.validateBody(validation_1.BusinessRule.requestPasswordReset);
        const handler = req.container.resolve("requestPasswordReset");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, response => {
            res.status(http_status_1.default.OK).json(response);
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
    resetPassword(req, res, next) {
        req.validateBody(validation_1.BusinessRule.resetPassword);
        const handler = req.container.resolve("resetPassword");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, response => {
            res.status(http_status_1.default.OK).json(response);
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
    getStats(req, res, next) {
        const handler = req.container.resolve("getBusinessUserActivityStats");
        const { SUCCESS, ERROR } = handler.outputs;
        handler
            .on(SUCCESS, data => {
            res.status(http_status_1.default.OK).json(data);
        })
            .on(ERROR, next);
        handler.execute();
    }
};
//# sourceMappingURL=business-controller.js.map