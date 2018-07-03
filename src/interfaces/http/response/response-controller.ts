
import { RecordResponse, GetFormResponses, UpdateResponseContent, ProcessResponse, DeleteResponse, GetResponseByStatus, AddNoteToResponse } from "../../../app/response";
import { ResponseRule } from "../validation";
import { Router, Response } from "express";
import Status from "http-status";
import { auth } from "../middleware";

export const ResponseController = {
  get router() {
    const router = Router();
    router
      .get("/bystatus/:status", auth, this.getByStatus)
      .get("/forms/:form", auth, this.getFormResponses)
      .put("/process/:response", auth, this.process)
      .put("/:response", auth, this.updateContent)
      .delete("/:response", auth, this.delete)
      .post("/", auth, this.record);

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

  getByStatus(req: any, res: Response, next: any) {
    req.validateBody(ResponseRule.byStatus.params);
    req.validateQuery(ResponseRule.byStatus.query);
    const handler = <GetResponseByStatus>req.container.resolve("getResponseByStatus");
    const { SUCCESS, ERROR } = handler.outputs;

    const command = {
      status: req.params.status,
      page: (req.query.page || 1),
      limit: (req.query.limit || 10)
    };

    handler.on(SUCCESS, data => {
      res.status(Status.OK).json(data);
    })
    .on(ERROR, next);

    handler.execute(command);
  },

  addNote(req: any, res: Response, next: any) {
    req.validateParams(ResponseRule.addNotes.params);
    req.validateBody(ResponseRule.addNotes.body);
    const handler = <AddNoteToResponse>req.container.resolve("addNoteToResponse");
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    const command = {
      response: req.params.response,
      note: req.body.note,
      user: req.user
    };
    handler.on(SUCCESS, data => {
      res.status(Status.OK).json(data);
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.INTERNAL_SERVER_ERROR).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);

    handler.execute(command);
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
    const command = {
      response: req.params.response,
      processor: req.user
    };
    handler.execute(command);
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
