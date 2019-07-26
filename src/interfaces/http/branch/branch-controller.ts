import { auth, admin } from "../middleware";
import { Router, Response } from "express";
import { UserRules, BranchRules } from "../validation";
import Status from "http-status";
import {
  GetBusinessUserActivityStats,
  RequestPasswordReset,
  DeleteBusinessBranch,
  LoginBusinessUser,
  AddBusinessBranch,
  ResetPassword
} from "../../../app/business";
// import { AddBusinessBranch } from "src/app/business/add-business-branch";
// import { DeleteBusinessBranch } from "src/app/business/delete-business-branch";

export const BranchController = {
  get router() {
    const router = Router();
    router
      .post("/requestpasswordreset", this.requestPasswordRest)
      .delete("/delete", auth, admin, this.deleteBranch)
      .post("/resetpassword", this.resetPassword)
      .post("/add", auth, admin, this.addBranch)
      .get("/stats", auth, this.getStats)
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

  addBranch(req: any, res: Response, next: any) {
    req.validateBody(BranchRules.addBranch);
    const handler = req.container.resolve(
      "addBusinessBranch"
    ) as AddBusinessBranch;
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
      branch: {
        name: req.body.name,
        area: req.body.area,
        address: req.body.address,
        state: req.body.state,
        stateId: req.body.stateId
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

  deleteBranch(req: any, res: Response, next: any) {
    req.validateBody(BranchRules.deleteBranch);
    const handler = req.container.resolve(
      "deleteBusinessBranch"
    ) as DeleteBusinessBranch;
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
    const command = { name: req.body.name, modifier: req.user };
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
