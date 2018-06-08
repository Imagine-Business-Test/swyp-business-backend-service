
import { RecordResponse, GetFormResponses, UpdateResponseContent, ProcessResponse, DeleteResponse } from "../../../app/response";
import { ResponseRule } from "../validation";
import { Router, Response } from "express";
import Status from "http-status";
import { auth } from "../middleware";

export const ResponseController = {
  get router() {
    const router = Router();
    router.post("/", auth, this.record)
      .get("/forms/:form", auth, this.getFormResponses)
      .put("/:response", auth, this.updateContent)
      .put("/process/:response", auth, this.process)
      .delete("/:response", auth, this.delete);

    return router;
  },

  record(req: any, res: Response, next: any) {
    req.validateBody(ResponseRule.recordResponse);
    const handler = <RecordResponse>req.container.resolve("recordResponse");
    const serializer = req.container.resolve("responseSerializer");
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

    handler.execute(req.body);
  },


  getFormResponses(req: any, res: Response, next: any) {
    req.validateParams(ResponseRule.getFormResponse);
    const handler = <GetFormResponses>req.container.resolve("getFormResponses");
    const serializer = req.container.resolve("responseSerializer");
    const { SUCCESS, ERROR } = handler.outputs;

    handler.on(SUCCESS, response => {
      res.status(Status.CREATED).json(serializer.serialize(response));
    })
    .on(ERROR, next);

    handler.execute(req.params);
  },

  updateContent(req: any, res: Response, next: any) {
    req.validateParams(ResponseRule.updateContent.response);
    req.validateBody(ResponseRule.updateContent.content);
    const handler = <UpdateResponseContent>req.container.resolve("updateResponseContent");
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler.on(SUCCESS, () => {
      res.status(Status.OK).json({ updated: true });
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_REQUEST).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);
    const command = { response: req.params.response, content: req.body.content };
    handler.execute(command);
  },

  process(req: any, res: Response, next: any) {
    req.validateParams(ResponseRule.processResponse);
    const handler = <ProcessResponse>req.container.resolve("processResponse");
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler.on(SUCCESS, () => {
      res.status(Status.OK).json({ updated: true });
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_REQUEST).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);
    handler.execute(req.params);
  },

  delete(req: any, res: Response, next: any) {
    req.validateParams(ResponseRule.processResponse);
    const handler = <DeleteResponse>req.container.resolve("deleteResponse");
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler.on(SUCCESS, () => {
      res.status(Status.OK).json({ deleted: true });
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_REQUEST).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);

    handler.execute(req.params);
  }
};
