"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../middleware");
const express_1 = require("express");
const validation_1 = require("../validation");
const http_status_1 = __importDefault(require("http-status"));
exports.UserController = {
    get router() {
        const router = express_1.Router();
        router
            .post("/requestpasswordreset", this.requestPasswordRest)
            .delete("/delete", middleware_1.auth, middleware_1.admin, this.deleteUser)
            .post("/resetpassword", this.resetPassword)
            .post("/add", middleware_1.auth, middleware_1.admin, this.addUser)
            .get("/stats", middleware_1.auth, this.getStats)
            .get("/completesignup/:token", this.completeSignupVerify)
            .post("/completesignup/:token", this.completeSignupVerify)
            .post("/login", this.loginUser);
        return router;
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
    },
    addUser(req, res, next) {
        req.validateBody(validation_1.UserRules.addUser);
        const handler = req.container.resolve("addBusinessUser");
        const serializer = req.container.resolve("businessSerializer");
        const { SUCCESS, ERROR, DATABASE_ERROR, INCOMPLETE_SETUP, AUTHENTICATION_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, response => {
            res.status(http_status_1.default.CREATED).json(serializer.serialize(response));
        })
            .on(AUTHENTICATION_ERROR, () => {
            res.status(http_status_1.default.UNAUTHORIZED).json({
                type: "AuthorizationError",
                details: "Access Denied"
            });
        })
            .on(INCOMPLETE_SETUP, () => {
            res.status(http_status_1.default.UNAUTHORIZED).json({
                type: "AuthorizationError",
                details: "This account is not fully setup!"
            });
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
                branch: req.body.branch,
                phone: req.body.phone,
                email: req.body.email,
                name: req.body.name,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                role: req.body.role
            },
            origin: req.body.origin,
            user: req.user,
            businessId: req.body.business
        };
        handler.execute(command);
    },
    loginUser(req, res, next) {
        req.validateBody(validation_1.UserRules.loginUser);
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
    confirmUser(req, res, next) {
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
    completeSignupVerify(req, res, next) {
        req.validateParams(validation_1.UserRules.completeSignup);
        const handler = req.container.resolve("CompleteUserSignup");
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
        req.body.token = req.params.token;
        handler.execute(req.body);
    },
    completeSignupSubmit(req, res, next) {
        req.validateParams(validation_1.UserRules.completeSignup);
        req.validateBody(validation_1.UserRules.completeSignup);
        const handler = req.container.resolve("CompleteUserSignup");
        const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
        handler
            .on(SUCCESS, response => {
            res.send(response);
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
        req.validateBody(validation_1.UserRules.deleteUser);
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
    resetPassword(req, res, next) {
        req.validateBody(validation_1.UserRules.resetPassword);
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
    requestPasswordRest(req, res, next) {
        req.validateBody(validation_1.UserRules.requestPasswordReset);
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
    }
};
//# sourceMappingURL=user-controller.js.map