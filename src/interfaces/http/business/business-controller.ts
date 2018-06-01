import { CreateBusiness } from "../../../app/business";
import { BusinessRule } from "../validation";
import { Router, Response } from "express";
import  Status from "http-status";


export const BusinessController = {

  get router() {
    const router = Router();
    router.post("/", this.create);

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
  }
};

