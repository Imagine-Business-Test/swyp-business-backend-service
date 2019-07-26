import { auth, admin } from "../middleware";
import { Router, Response } from "express";
import { UserRules } from "../validation";
import Status from "http-status";
import {
  GetBusinessUserActivityStats,
  RequestPasswordReset,
  DeleteBusinessUser,
  LoginBusinessUser,
  AddBusinessUser,
  ResetPassword
} from "../../../app/business";

export const UserController = {
  get router() {
    const router = Router();
    router
      .post("/requestpasswordreset", this.requestPasswordRest)
      .delete("/delete", auth, admin, this.deleteUser)
      .post("/resetpassword", this.resetPassword)
      .post("/add", auth, admin, this.addUser)
      .get("/stats", auth, this.getStats)
      .get("/completesignup", this.completeSignup)
      .post("/login", this.loginUser);
    return router;
  },

  getStats(req: any, res: Response, next: any) {
    const handler = req.container.resolve(
      "getBusinessUserActivityStats"
    ) as GetBusinessUserActivityStats;
    const { SUCCESS, ERROR } = handler.outputs;

    handler
      .on(SUCCESS, data => {
        res.status(Status.OK).json(data);
      })
      .on(ERROR, next);

    handler.execute();
  },

  addUser(req: any, res: Response, next: any) {
    req.validateBody(UserRules.addUser);
    const handler = req.container.resolve("addBusinessUser") as AddBusinessUser;
    const serializer = req.container.resolve("businessSerializer");

    const {
      SUCCESS,
      ERROR,
      DATABASE_ERROR,
      INCOMPLETE_SETUP,
      AUTHENTICATION_ERROR
    } = handler.outputs;

    handler
      .on(SUCCESS, response => {
        res.status(Status.CREATED).json(serializer.serialize(response));
      })
      .on(AUTHENTICATION_ERROR, () => {
        res.status(Status.UNAUTHORIZED).json({
          type: "AuthorizationError",
          details: "Access Denied"
        });
      })
      .on(INCOMPLETE_SETUP, () => {
        res.status(Status.UNAUTHORIZED).json({
          type: "AuthorizationError",
          details: "This account is not fully setup!"
        });
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
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

  loginUser(req: any, res: Response, next: any) {
    req.validateBody(UserRules.loginUser);
    const handler = req.container.resolve(
      "loginBusinessUser"
    ) as LoginBusinessUser;
    const serializer = req.container.resolve("businessSerializer");

    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, response => {
        res.status(Status.OK).json(serializer.serialize(response));
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          details: error.details,
          type: "DatabaseError"
        });
      })
      .on(ERROR, next);

    handler.execute(req.body);
  },

  completeSignup(req: any, res: Response, next: any) {
    res.send(req);
    return;
    req.validateBody(UserRules.completeSignup);
    const handler = req.container.resolve(
      "loginBusinessUser"
    ) as LoginBusinessUser;
    const serializer = req.container.resolve("businessSerializer");

    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, response => {
        res.status(Status.OK).json(serializer.serialize(response));
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          details: error.details,
          type: "DatabaseError"
        });
      })
      .on(ERROR, next);

    handler.execute(req.body);
  },

  deleteUser(req: any, res: Response, next: any) {
    req.validateBody(UserRules.deleteUser);
    const handler = req.container.resolve(
      "deleteBusinessUser"
    ) as DeleteBusinessUser;
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, response => {
        res.status(Status.OK).json(response);
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          details: error.details,
          type: "DatabaseError"
        });
      })
      .on(ERROR, next);
    const command = { email: req.body.email, modifier: req.user };
    handler.execute(command);
  },

  resetPassword(req: any, res: Response, next: any) {
    req.validateBody(UserRules.resetPassword);
    const handler = req.container.resolve("resetPassword") as ResetPassword;
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, response => {
        res.status(Status.OK).json(response);
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          details: error.details,
          type: "DatabaseError"
        });
      })
      .on(ERROR, next);

    handler.execute(req.body);
  },

  requestPasswordRest(req: any, res: Response, next: any) {
    req.validateBody(UserRules.requestPasswordReset);
    const handler = req.container.resolve(
      "requestPasswordReset"
    ) as RequestPasswordReset;
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, response => {
        res.status(Status.OK).json(response);
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          details: error.details,
          type: "DatabaseError"
        });
      })
      .on(ERROR, next);

    handler.execute(req.body);
  }
};
