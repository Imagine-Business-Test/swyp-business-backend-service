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
        router
            .get("/", this.all)
            .post("/requestpasswordreset", this.requestPasswordRest)
            .put("/updatebranch", middleware_1.auth, middleware_1.admin, this.updateBranch)
            .delete("/deleteuser", middleware_1.auth, middleware_1.admin, this.deleteUser)
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
    updateBranch(req, res, next) {
        req.validateBody(validation_1.BusinessRule.updateBranch);
        const handler = req.container.resolve("updateUserBranch");
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
            userId: req.body.userId,
            newBranch: req.body.branch,
            user: req.user
        };
        handler.execute(command);
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
    }
};
//# sourceMappingURL=business-controller.js.map