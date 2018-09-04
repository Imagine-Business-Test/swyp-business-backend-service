import { Response, Router } from "express";
import Status from "http-status";
import { admin, auth } from "../middleware";
import { BusinessRule } from "../validation";

import {
  AddBusinessUser,
  CreateBusiness,
  DeleteBusinessUser,
  GetBusinesses,
  GetBusinessUserActivityStats,
  LoginBusinessUser,
  RequestPasswordReset,
  ResetPassword
} from "../../../app/business";

export const BusinessController = {
  get router() {
    const router = Router();
    router
      .get("/", this.all)
      .post("/requestpasswordreset", this.requestPasswordRest)
      .delete("/deleteuser", auth, admin, this.deleteUser)
      .post("/resetpassword", this.resetPassword)
      .post("/adduser", auth, admin, this.addUser)
      .post("/loginuser", this.loginUser)
      .get("/stats", auth, this.getStats)
      .post("/", this.create);

    return router;
  },

  all(req: any, res: Response, next: any) {
    const handler: GetBusinesses = req.container.resolve("getBusinesses");
    const serializer = req.container.resolve("businessSerializer");
    const { SUCCESS, ERROR } = handler.outputs;
    handler
      .on(SUCCESS, data => {
        res.status(Status.OK).json(serializer.lean(data));
      })
      .on(ERROR, next);

    handler.execute();
  },

  create(req: any, res: Response, next: any) {
    req.validateBody(BusinessRule.createBusiness);
    const handler = req.container.resolve("createBusiness") as CreateBusiness;
    const serializer = req.container.resolve("businessSerializer");
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, biz => {
        res.status(Status.CREATED).json(serializer.serialize(biz));
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_GATEWAY).json({
          details: error.details,
          type: "DatabaseError"
        });
      })
      .on(ERROR, next);

    handler.execute(req.body);
  },

  addUser(req: any, res: Response, next: any) {
    req.validateBody(BusinessRule.addBusinessUser);
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
        role: req.body.role
      },
      origin: req.body.origin,
      user: req.user,
      businessId: req.body.business
    };
    handler.execute(command);
  },

  loginUser(req: any, res: Response, next: any) {
    req.validateBody(BusinessRule.loginBusinessUser);
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
    req.validateBody(BusinessRule.deleteBusinessUser);
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

  requestPasswordRest(req: any, res: Response, next: any) {
    req.validateBody(BusinessRule.requestPasswordReset);
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
  },

  resetPassword(req: any, res: Response, next: any) {
    req.validateBody(BusinessRule.resetPassword);
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
  }
};
