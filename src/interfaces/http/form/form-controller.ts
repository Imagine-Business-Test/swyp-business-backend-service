import { Response, Router } from "express";
import { FormRules } from "../validation";
import { auth } from "../middleware";
import Status from "http-status";
import {
  CreateForm,
  UpdateFormContent,
  DeleteForm,
  DisableForm,
  GetBusinessForms,
  GetFormContent,
  GetWorkspaceForms
} from "../../../app/form";

export const FormController = {
  get router() {
    const router = Router();
    router
      .get("/workspaces/:workspace/:businessId", this.getWorkspaceForms)
      .get("/businesses/:business/:parent/:formtype", this.getBusinessForms)
      // .put("/:form", auth, this.updateContent)
      .get("/:biz/:parent/:formType/:form", this.getFormContent)
      .put("/disable/:form", auth, this.disable)
      .delete("/:form", auth, this.delete)
      .post("/", auth, this.create)
      .put("/", auth, this.updateContent);

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
          type: "DatabaseError",
          details: error.details
        });
      })
      .on(ERROR, next);
    const command = { ...req.body, user: req.user };
    handler.execute(command);
  },

  update(req: any, res: Response, next: any) {
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
          type: "DatabaseError",
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
    req.validateParams(FormRules.getContentOf);
    const handler: GetFormContent = req.container.resolve("getFormContent");
    const serializer = req.container.resolve("formSerializer");
    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler
      .on(SUCCESS, form => {
        res.status(Status.OK).json(serializer.forBusiness(form));
      })
      .on(DATABASE_ERROR, error => {
        res.status(Status.BAD_GATEWAY).json({
          type: "DatabaseError",
          details: error.details
        });
      })
      .on(ERROR, next);
    const command = {
      formTypeParent: req.params.parent,
      formType: req.params.formType,
      businessSlug: req.params.biz,
      formSlug: req.params.form
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
  },

  updateContent(req: any, res: Response, next: any) {
    // return res.send(JSON.stringify(req.body));
    req.validateBody(FormRules.updateContent);
    // req.validateParams(FormRules.updateContent);

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
      form: req.body.formId,
      content: req.body.elements,
      modifier: req.user
    };
    handler.execute(command);
  }
};
