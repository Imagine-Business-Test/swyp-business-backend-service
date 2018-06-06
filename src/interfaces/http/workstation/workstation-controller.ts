import { CreateWorkstation, GetBusinessWorkstations, DeleteWorkstation } from "../../../app/workstation";
import { WorkstationRule } from "../validation";
import { Router, Response } from "express";
import { auth } from "../middleware";
import  Status from "http-status";


export const WorkstationController = {
  get router() {
    const router = Router();
    router.post("/", auth, this.create)
      .get("/getbybusiness/:business", auth, this.getBusinessWorkstations)
      .delete("/:id", auth, this.delete);

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
  },

  getBusinessWorkstations(req: any, res: Response, next: any) {
    req.validateParams(WorkstationRule.getBusinessWorkstations);


    const handler = <GetBusinessWorkstations>req.container.resolve("getBusinessWorkstations");
    const serializer = req.container.resolve("workstationSerializer");
    const { SUCCESS, ERROR } = handler.outputs;

    handler.on(SUCCESS, workstation => {
      res.status(Status.OK).json(serializer.serialize(workstation));
    })
    .on(ERROR, next);

    handler.execute(req.params);
  },

  delete(req: any, res: Response, next: any) {
    req.validateParams(WorkstationRule.deleteWorkstation);
    const handler = <DeleteWorkstation>req.container.resolve("deleteWorkstation");

    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler.on(SUCCESS, () => {
      res.status(Status.OK).json({ deleted: true });
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_GATEWAY).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);

    const command = {
      workstation: req.params.id,
      user: req.user
    };

    handler.execute(command);
  }
};
