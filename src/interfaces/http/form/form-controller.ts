import { CreateForm, GetWorkstationForms, UpdateFormContent, DisableForm, DeleteForm } from "../../../app/form";
import { Router, Response } from "express";
import { FormRules } from "../validation";
import { auth } from "../middleware";
import Status from "http-status";



export const FormController = {
  get router() {
    const router = Router();
    router.post("/", auth, this.create)
      .get("/workstations/:workstation", auth, this.getWorkStationForms)
      .put("/:form", auth, this.updateContent)
      .put("/disable/:form", auth, this.disable)
      .delete("/:form", auth, this.delete);

    return router;
  },

  create(req: any, res: Response, next: any) {
    req.validateBody(FormRules.createForm);
    const handler = <CreateForm>req.container.resolve("createForm");
    const serializer = req.container.resolove("formSerializer");

    const { SUCCESS, ERROR, DATABASE_ERROR } = handler.outputs;

    handler.on(SUCCESS, form => {
      res.status(Status.CREATED).json(serializer.serialize(form));
    })
    .on(DATABASE_ERROR, error => {
      res.status(Status.BAD_GATEWAY).json({
        type: "DatabaseError",
        details: error.details
      });
    })
    .on(ERROR, next);

    handler.execute(req.body);
  },

  getWorkStationForms(req: any, res: Response, next: any) {
    req.validateParams(FormRules.getWorkstationForms);

    const handler = <GetWorkstationForms>req.container.resolve("getWorkstationForms");
    const serializer = req.container.resolove("formSerializer");
    const { SUCCESS, ERROR } = handler.outputs;

    handler.on(SUCCESS, workstation => {
      res.status(Status.OK).json(serializer.serialize(workstation));
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
    const handler = <DisableForm>req.container.resolved("disableForm");
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
    const handler = <DeleteForm>req.container.resolved("deleteForm");
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
