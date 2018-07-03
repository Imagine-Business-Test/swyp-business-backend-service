import { BusinessRule } from "../validation";
import { Router, Response } from "express";
import { auth } from "../middleware";
import  Status from "http-status";

import {
  GetBusinessUserActivityStats,
  RequestPasswordReset,
  DeleteBusinessUser,
  LoginBusinessUser,
  AddBusinessUser,
  CreateBusiness,
  ResetPassword,
} from "../../../app/business";


export const BusinessController = {

  get router() {
    const router = Router();
    router
      .post("/requestpasswordrest", this.requestPasswordRest)
      .post("/deleteuser", auth, this.deleteUser)
      .post("/resetpassword", this.resetPassword)
      .post("/adduser", auth, this.addUser)
      .post("/loginuser", this.loginUser)
      .get("/stats", auth, this.getStats)
      .post("/", this.create);

    return router;
  },

  create(req: any, res: Response, next: any) {
    req.validateBody(BusinessRule.createBusiness);
    const handler    = <CreateBusiness>req.container.resolve("createBusiness");
    const serializer = req.container.resolve("businessSerializer");
    const {SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler.on(SUCCESS, biz => {
      res.status(Status.CREATED).json(serializer.serialize(biz));
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_GATEWAY).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);

    handler.execute(req.body);
  },

  addUser(req: any, res: Response, next: any) {
    req.validateBody(BusinessRule.addBusinessUser);
    const handler = <AddBusinessUser>req.container.resolve("addBusinessUser");
    const serializer = req.container.resolve("businessSerializer");

    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler.on(SUCCESS, response => {
      res.status(Status.CREATED).json(serializer.serialize(response));
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_REQUEST).json({
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

  loginUser(req: any, res: Response, next: any) {
    req.validateBody(BusinessRule.loginBusinessUser);
    const handler = <LoginBusinessUser>req.container.resolve("loginBusinessUser");
    const serializer = req.container.resolve("businessSerializer");

    const { SUCCESS, ERROR, DATABASE_ERROR} = handler.outputs;

    handler.on(SUCCESS, response => {
      res.status(Status.OK).json(serializer.serialize(response));
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_REQUEST).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);

    handler.execute(req.body);
  },

  deleteUser(req: any, res: Response, next: any) {
    req.validateBody(BusinessRule.deleteBusinessUser);
    const handler = <DeleteBusinessUser>req.container.resolve("deleteBusinessUser");
    const { SUCCESS, ERROR, DATABASE_ERROR} = handler.outputs;

    handler.on(SUCCESS, response => {
      res.status(Status.OK).json(response);
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_REQUEST).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);
    const command = { email: req.body.email, modifier: req.user };
    handler.execute(command);
  },

  requestPasswordRest(req: any, res: Response, next: any) {
    req.validateBody(BusinessRule.requestPasswordReset);
    const handler = <RequestPasswordReset>req.container.resolve("requestPasswordReset");
    const { SUCCESS, ERROR, DATABASE_ERROR} = handler.outputs;

    handler.on(SUCCESS, response => {
      res.status(Status.OK).json(response);
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_REQUEST).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);

    handler.execute(req.body);
  },

  resetPassword(req: any, res: Response, next: any) {
    req.validateBody(BusinessRule.resetPassword);
    const handler = <ResetPassword>req.container.resolve("resetPassword");
    const { SUCCESS, ERROR, DATABASE_ERROR} = handler.outputs;

    handler.on(SUCCESS, response => {
      res.status(Status.OK).json(response);
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_REQUEST).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);

    handler.execute(req.body);
  },

  getStats(req: any, res: Response, next: any) {
    const handler = <GetBusinessUserActivityStats>
                      req.container.resolve("getBusinessUserActivityStats");
    const { SUCCESS, ERROR } = handler.outputs;

    handler.on(SUCCESS, data => {
      res.status(Status.OK).json(data);
    })
    .on(ERROR, next);

    handler.execute();
  }
};

