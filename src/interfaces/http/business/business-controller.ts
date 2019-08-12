import { BusinessRule } from "../validation";
import { admin, auth } from "../middleware";
import { Response, Router } from "express";
import Status from "http-status";

import {
  UpdateUserDetails,
  CreateBusiness,
  GetBusinesses,
  UpdateBusinessDetails
} from "../../../app/business";

export const BusinessController = {
  get router() {
    const router = Router();
    router
      .get("/", this.all)
      .put("/updateuser", auth, admin, this.updateUser)
      .put("/updatedetails", auth, admin, this.updateDetails)
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

  updateUser(req: any, res: Response, next: any) {
    // res.send(req.body);
    // return;
    req.validateBody(BusinessRule.updateBranch);
    const handler = req.container.resolve(
      "updateUserDetails"
    ) as UpdateUserDetails;
    const serializer = req.container.resolve("businessSerializer");
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, resp => {
        res.status(Status.OK).json(serializer.serialize(resp));
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
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

  updateDetails(req: any, res: Response, next: any) {
    req.validateBody(BusinessRule.updateDetails);
    const handler = req.container.resolve(
      "updateBusinessDetails"
    ) as UpdateBusinessDetails;
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, resp => {
        res.status(Status.OK).json(resp);
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
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
