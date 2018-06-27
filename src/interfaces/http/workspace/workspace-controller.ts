import { CreateWorkspace, GetBusinessWorkspaces, DeleteWorkspace } from "../../../app/workspace";
import { WorkspaceRule } from "../validation";
import { Router, Response } from "express";
import { auth } from "../middleware";
import  Status from "http-status";


export const WorkspaceController = {
  get router() {
    const router = Router();
    router.post("/", auth, this.create)
      .get("/getbybusiness/:business", auth, this.getBusinessWorkspaces)
      .delete("/:id", auth, this.delete);

    return router;
  },

  create(req: any, res: Response, next: any) {
    req.validateBody(WorkspaceRule.createWorkspace);

    const handler = <CreateWorkspace>req.container.resolve("createWorkspace");
    const serializer = req.container.resolve("workspaceSerializer");
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler.on(SUCCESS, workspace => {
      res.status(Status.CREATED).json(serializer.serialize(workspace));
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

  getBusinessWorkspaces(req: any, res: Response, next: any) {
    req.validateParams(WorkspaceRule.getBusinessWorkspaces);


    const handler = <GetBusinessWorkspaces>req.container.resolve("getBusinessWorkspaces");
    const serializer = req.container.resolve("workspaceSerializer");
    const { SUCCESS, ERROR } = handler.outputs;

    handler.on(SUCCESS, workspace => {
      res.status(Status.OK).json(serializer.serialize(workspace));
    })
    .on(ERROR, next);

    handler.execute(req.params);
  },

  delete(req: any, res: Response, next: any) {
    req.validateParams(WorkspaceRule.deleteWorkspace);
    const handler = <DeleteWorkspace>req.container.resolve("deleteWorkspace");

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
      workspace: req.params.id,
      user: req.user
    };

    handler.execute(command);
  }
};
