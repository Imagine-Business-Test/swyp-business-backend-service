import {
  GetWorkspaceForms,
  UpdateFormContent,
  DisableForm,
  CreateForm,
  DeleteForm,
  GetABusinessForms
} from "../../../app/form";
import { Router, Response } from "express";
import { FormRules } from "../validation";
import { auth } from "../middleware";
import Status from "http-status";

export const FormController = {
  get router() {
    const router = Router();
    router
      .get("/by-same-business/:business", auth, this.getBySameBusiness)
      .get("/workspaces/:workspace", auth, this.getWorkspaceForms)
      .put("/:form", auth, this.updateContent)
      .put("/disable/:form", auth, this.disable)
      .delete("/:form", auth, this.delete)
      .post("/", auth, this.create);

    return router;
  },

  create(req: any, res: Response, next: any) {
    req.validateBody(FormRules.createForm);
    const handler = <CreateForm>req.container.resolve("createForm");
    const serializer = req.container.resolve("formSerializer");

    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler.on(SUCCESS, form => {
      res.status(Status.CREATED).json(serializer.serialize(form));
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_GATEWAY).json({
        type: "DatabaseErrorMe",
        details: error.details
      });
    })
    .on(ERROR, next);
    const command = { ...req.body, user: req.user };
    handler.execute(command);
  },

  getWorkspaceForms(req: any, res: Response, next: any) {
    req.validateParams(FormRules.getWorkspaceForms);

    const handler = <GetWorkspaceForms>req.container.resolve("getWorkspaceForms");
    const serializer = req.container.resolve("formSerializer");
    const { SUCCESS, ERROR } = handler.outputs;

    handler.on(SUCCESS, workspace => {
      res.status(Status.OK).json(serializer.serialize(workspace));
    })
    .on(ERROR, next);

    handler.execute(req.params);
  },

  getBySameBusiness(req: any, res: Response, next: any) {
    req.validateParams(FormRules.getABusinessForms);
    const handler = <GetABusinessForms>req.container.resolve("getABusinessForms");

    const { SUCCESS, ERROR } = handler.outputs;

    handler.on(SUCCESS, data => {
      res.status(Status.OK).json(data);
    })
    .on(ERROR, next);

    handler.execute(req.params);
  },

  updateContent(req: any, res: Response, next: any) {
    req.validateBody(FormRules.updateContent.content);
    req.validateParams(FormRules.updateContent.form);

    const handler = <UpdateFormContent>req.container.resolve("updateFormContent");
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler.on(SUCCESS, () => {
      res.status(Status.OK).json({ updated: true });
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_GATEWAY).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);

    const command = { form: req.params.form, content: req.body.content, modifier: req.user };
    handler.execute(command);
  },

  disable(req: any, res: Response, next: any) {
    req.validateParams(FormRules.disableForm);
    const handler = <DisableForm>req.container.resolve("disableForm");
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler.on(SUCCESS, () => {
      res.status(Status.OK).json({ updated: true });
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_GATEWAY).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);

    handler.execute(req.params);
  },

  delete(req: any, res: Response, next: any) {
    req.validateParams(FormRules.disableForm);
    const handler = <DeleteForm>req.container.resolve("deleteForm");
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

    handler.execute(req.params);
  }
};
