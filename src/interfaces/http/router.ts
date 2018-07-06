/* tslint:disable: variable-name */
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import { Router } from "express";
import { BusinessController } from "./business";
import { FormController } from "./form";
import { ResponseController } from "./response";
import { WorkspaceController } from "./workspace";

export default (
  logMiddleware: any,
  errorHandler: any,
  container: any,
  validator: any,
  configMiddleware: any
) => {
  const router = Router();
  router.use(logMiddleware);

  const apiRouter = Router();

  apiRouter
    .use(cors())
    .use(container)
    .use(bodyParser.json())
    .use(compression())
    .use(validator)
    .use(configMiddleware)
    .get("/", (_req, res) => {
      res.send("Welcome to swyp business API");
    })
    .use("/workspaces", WorkspaceController.router)
    .use("/businesses", BusinessController.router)
    .use("/responses", ResponseController.router)
    .use("/forms", FormController.router);

  router.use("/api/v1", apiRouter).use(errorHandler);

  return router;
};
