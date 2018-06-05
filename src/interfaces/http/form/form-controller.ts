import { CreateForm } from "../../../app/form";
import { Router, Response } from "express";
import { FormRules } from "../validation";
import { auth } from "../middleware";
import Status from "http-status";



export const FormController = {
  get router() {
    const router = Router();
    router.post("/", auth, this.create);

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
  }
};
