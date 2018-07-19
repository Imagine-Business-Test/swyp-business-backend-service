import { Response, Router } from "express";
import Status from "http-status";
import {
  CreateForm,
  DeleteForm,
  DisableForm,
  GetBusinessForms,
  GetFormContent,
  GetWorkspaceForms,
  UpdateFormContent
} from "../../../app/form";
import { auth } from "../middleware";
import { FormRules } from "../validation";

export const FormController = {
  get router() {
    const router = Router();
    router

      .get("/workspaces/:workspace", auth, this.getWorkspaceForms)
      .get("/businesses/:business", this.getBusinessForms)
      .put("/:form", auth, this.updateContent)
      .get("/:slug", this.getFormContent)
      .put("/disable/:form", auth, this.disable)
      .delete("/:form", auth, this.delete)
      .post("/", auth, this.create);

    return router;
  },

  create(req: any, res: Response, next: any) {
    req.validateBody(FormRules.createForm);
    const handler = req.container.resolve("createForm") as CreateForm;
    const serializer = req.container.resolve("formSerializer");

    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, form => {
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

    const handler = req.container.resolve(
      "getWorkspaceForms"
    ) as GetWorkspaceForms;
    const serializer = req.container.resolve("formSerializer");
    const { SUCCESS, ERROR } = handler.outputs;

    handler
      .on(SUCCESS, forms => {
        res.status(Status.OK).json(serializer.serialize(forms));
      })
      .on(ERROR, next);

    handler.execute(req.params);
  },

  getBusinessForms(req: any, res: Response, next: any) {
    req.validateParams(FormRules.getABusinessForms);
    const handler = req.container.resolve(
      "getBusinessForms"
    ) as GetBusinessForms;
    const serializer = req.container.resolve("formSerializer");

    const { SUCCESS, ERROR } = handler.outputs;

    handler
      .on(SUCCESS, forms => {
        res.status(Status.OK).json(serializer.serialize(forms));
      })
      .on(ERROR, next);

    handler.execute(req.params);
  },

  getFormContent(req: any, res: Response, next: any) {
    const handler: GetFormContent = req.container.resolve("getFormContent");
    const serializer = req.container.resolve("formSerializer");
    const { SUCCESS, ERROR } = handler.outputs;

    handler
      .on(SUCCESS, form => {
        res.status(Status.OK).json(serializer.forBusiness(form));
      })
      .on(ERROR, next);

    handler.execute(req.params);
  },

  updateContent(req: any, res: Response, next: any) {
    req.validateBody(FormRules.updateContent.content);
    req.validateParams(FormRules.updateContent.form);

    const handler = req.container.resolve(
      "updateFormContent"
    ) as UpdateFormContent;
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, () => {
        res.status(Status.OK).json({ updated: true });
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_GATEWAY).json({
          type: "DatabaseError",
          details: error.details
        });
      })
      .on(ERROR, next);

    const command = {
      form: req.params.form,
      content: req.body.content,
      modifier: req.user
    };
    handler.execute(command);
  },

  disable(req: any, res: Response, next: any) {
    req.validateParams(FormRules.disableForm);
    const handler = req.container.resolve("disableForm") as DisableForm;
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, () => {
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
    const handler = req.container.resolve("deleteForm") as DeleteForm;
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, () => {
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
