import { Response, Router } from "express";
import Status from "http-status";
import {
  GetResponseByStatus,
  AddNoteToResponse,
  GetFormResponses,
  DeleteResponse,
  RecordResponse,
  OfficialSignoff
} from "../../../app/response";
import { auth } from "../middleware";
import { ResponseRule } from "../validation";

export const ResponseController = {
  get router() {
    const router = Router();
    router
      .get("/bystatus/:status", auth, this.getByStatus)
      .get("/forms/:form", auth, this.getFormResponses)
      .post("/addnote/:response", auth, this.addNote)
      .put("/signoff/:response", auth, this.signOff)
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

  signOff(req: any, res: Response, next: any) {
    req.validateBody(ResponseRule.signOffOfficially);
    req.validateParams(ResponseRule.id);
    const handler = req.container.resolve("officialSignoff") as OfficialSignoff;
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;
    const command = {
      user: req.user,
      id: req.params.response,
      signatureUrl: req.body.signatureUrl
    };
    handler
      .on(SUCCESS, response => {
        res.status(Status.OK).json(response);
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

  delete(req: any, res: Response, next: any) {
    req.validateParams(ResponseRule.id);
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
