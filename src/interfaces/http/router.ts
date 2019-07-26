/* tslint:disable: variable-name */
import { FileUploadController } from "./file-upload";
import { WorkspaceController } from "./workspace";
import { ResponseController } from "./response";
import { BusinessController } from "./business";
import { FormController } from "./form";
import { UserController } from "./user";
import { BranchController } from "./branch";
import compression from "compression";
import bodyParser from "body-parser";
import { Router } from "express";
import cors from "cors";

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
      res.send("Welcome to swyp business service API");
    })
    .use("/workspaces", WorkspaceController.router)
    .use("/businesses", BusinessController.router)
    .use("/responses", ResponseController.router)
    .use("/upload", FileUploadController.router)
    .use("/user", UserController.router)
    // .use("/completesignup", UserController.router)
    .use("/branch", BranchController.router)
    .use("/forms", FormController.router);

  router.use("/api/v1", apiRouter).use(errorHandler);

  return router;
};
