import { CreateWorkstation } from "../../../app/workstation";
import { WorkstationRule } from "../validation";
import { Router, Response } from "express";
import { auth } from "../middleware";
import  Status from "http-status";


export const WorkstationController = {
  get router() {
    const router = Router();
    router.post("/", auth, this.create);

    return router;
  },

  create(req: any, res: Response, next: any) {
    req.validateBody(WorkstationRule.createWorkstation);

    const handler = <CreateWorkstation>req.container.resolve("createWorkstation");
    const serializer = req.container.resolve("workstationSerializer");
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler.on(SUCCESS, workstation => {
      res.status(Status.CREATED).json(serializer.serialize(workstation));
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_GATEWAY).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);

    const command = {
      businessId: req.body.business,
      name: req.body.name,
      user: req.user
    };
    handler.execute(command);
  }
};
