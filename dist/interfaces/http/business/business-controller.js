"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
const express_1 = require("express");
const middleware_1 = require("../middleware");
const http_status_1 = __importDefault(require("http-status"));
exports.BusinessController = {
    get router() {
        const router = express_1.Router();
        router.post("/", this.create)
            .post("/adduser", middleware_1.auth, this.addUser)
            .post("/loginuser", this.loginUser)
            .post("/deleteuser", middleware_1.auth, this.deleteUser)
            .post("/requestpasswordrest", this.requestPasswordRest)
            .post("/resetpassword", this.resetPassword);
        return router;
    },
    create(req, res, next) {
        req.validateBody(validation_1.BusinessRule.createBusiness);
        const handler = req.container.resolve("createBusiness");
        const serializer = req.container.resolve("businessSerializer");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler.on(SUCCESS, biz => {
            res.status(http_status_1.default.CREATED).json(serializer.serialize(biz));
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_GATEWAY).json({
                type: "DatabaseError",
                details: error.details
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
        const command = {
            businessId: req.body.business,
            account: {
                email: req.body.email,
                phone: req.body.phone,
                name: req.body.name,
                password: req.body.password
            }
        };
        handler.execute(command);
    },
    loginUser(req, res, next) {
        req.validateBody(validation_1.BusinessRule.loginBusinessUser);
        const handler = req.container.resolve("loginBusinessUser");
        const serializer = req.container.resolve("businessSerializer");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler.on(SUCCESS, response => {
            res.status(http_status_1.default.OK).json(serializer.serialize(response));
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
    deleteUser(req, res, next) {
        req.validateBody(validation_1.BusinessRule.deleteBusinessUser);
        const handler = req.container.resolve("deleteBusinessUser");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler.on(SUCCESS, response => {
            res.status(http_status_1.default.OK).json(response);
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_REQUEST).json({
                type: "DatabaseError",
                details: error.details
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
        handler.on(SUCCESS, response => {
            res.status(http_status_1.default.OK).json(response);
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
    resetPassword(req, res, next) {
        req.validateBody(validation_1.BusinessRule.resetPassword);
        const handler = req.container.resolve("resetPassword");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler.on(SUCCESS, response => {
            res.status(http_status_1.default.OK).json(response);
        })
            .on(DATABASE_ERROR, error => {
            res.status(http_status_1.default.BAD_REQUEST).json({
                type: "DatabaseError",
                details: error.details
            });
        })
            .on(ERROR, next);
        handler.execute(req.body);
    }
};
//# sourceMappingURL=business-controller.js.map