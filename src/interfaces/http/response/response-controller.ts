import { Response, Router } from "express";
import Status from "http-status";
import {
  AddNoteToResponse,
  DeleteResponse,
  GetFormResponses,
  GetResponseByStatus,
  ProcessResponse,
  RecordResponse,
  UpdateResponseContent
} from "../../../app/response";
import { auth } from "../middleware";
import { ResponseRule } from "../validation";

export const ResponseController = {
  get router() {
    const router = Router();
    router
      .get("/bystatus/:status", auth, this.getByStatus)
      .get("/forms/:form", auth, this.getFormResponses)
      .put("/process/:response", auth, this.process)
      .post("/addnote/:response", auth, this.addNote)
      .put("/:response", auth, this.updateContent)
      .delete("/:response", auth, this.delete)
      .post("/", this.record);

    return router;
  },

  record(req: any, res: Response, next: any) {
    req.validateBody(ResponseRule.recordResponse);
    const handler = req.container.resolve("recordResponse") as RecordResponse;
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, () => {
        res.status(Status.CREATED).json({ success: true });
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

  getFormResponses(req: any, res: Response, next: any) {
    req.validateParams(ResponseRule.getFormResponse);
    const handler = req.container.resolve(
      "getFormResponses"
    ) as GetFormResponses;
    const serializer = req.container.resolve("responseSerializer");
    const { SUCCESS, ERROR } = handler.outputs;

    handler
      .on(SUCCESS, response => {
        res.status(Status.CREATED).json(serializer.serialize(response));
      })
      .on(ERROR, next);

    handler.execute(req.params);
  },

  getByStatus(req: any, res: Response, next: any) {
    req.validateParams(ResponseRule.byStatus.params);
    req.validateQuery(ResponseRule.byStatus.query);
    const handler = req.container.resolve(
      "getResponseByStatus"
    ) as GetResponseByStatus;
    const serializer = req.container.resolve("responseSerializer");
    const { SUCCESS, ERROR } = handler.outputs;
    const { business, from, to } = req.query;
    const command =
      from && to
        ? {
            user: req.user,
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            status: req.params.status,
            business,
            from,
            to
          }
        : {
            user: req.user,
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            status: req.params.status,
            business
          };

    handler
      .on(SUCCESS, data => {
        res.status(Status.OK).json(serializer.serializeResult(data));
      })
      .on(ERROR, next);

    handler.execute(command);
  },

  addNote(req: any, res: Response, next: any) {
    req.validateParams(ResponseRule.addNotes.params);
    req.validateBody(ResponseRule.addNotes.body);
    const serializer = req.container.resolve("responseSerializer");
    const handler = req.container.resolve(
      "addNoteToResponse"
    ) as AddNoteToResponse;
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    const command = {
      note: req.body.note,
      response: req.params.response,
      user: req.user
    };
    handler
      .on(SUCCESS, data => {
        res.status(Status.OK).json(serializer.serialize(data));
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.INTERNAL_SERVER_ERROR).json({
          details: error.details,
          type: "DatabaseError"
        });
      })
      .on(ERROR, next);

    handler.execute(command);
  },

  updateContent(req: any, res: Response, next: any) {
    req.validateParams(ResponseRule.updateContent.response);
    req.validateBody(ResponseRule.updateContent.content);
    const handler = req.container.resolve(
      "updateResponseContent"
    ) as UpdateResponseContent;
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, () => {
        res.status(Status.OK).json({ updated: true });
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          details: error.details,
          type: "DatabaseError"
        });
      })
      .on(ERROR, next);
    const command = {
      content: req.body.content,
      response: req.params.response
    };
    handler.execute(command);
  },

  process(req: any, res: Response, next: any) {
    req.validateParams(ResponseRule.processResponse);
    const handler = req.container.resolve("processResponse") as ProcessResponse;
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, () => {
        res.status(Status.OK).json({ updated: true });
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          details: error.details,
          type: "DatabaseError"
        });
      })
      .on(ERROR, next);
    const command = {
      processor: req.user,
      response: req.params.response
    };
    handler.execute(command);
  },

  delete(req: any, res: Response, next: any) {
    req.validateParams(ResponseRule.processResponse);
    const handler = req.container.resolve("deleteResponse") as DeleteResponse;
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, () => {
        res.status(Status.OK).json({ deleted: true });
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          details: error.details,
          type: "DatabaseError"
        });
      })
      .on(ERROR, next);
    handler.execute(req.params);
  }
};
