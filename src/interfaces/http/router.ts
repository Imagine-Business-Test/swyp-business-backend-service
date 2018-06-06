import { WorkstationController } from "./workstation";
import { BusinessController } from "./business";
import { ResponseController } from "./response";
import { FormController } from "./form";
import compression from "compression";
import bodyParser from "body-parser";
import { Router } from "express";
import cors from "cors";



export default (logMiddleware: any, errorHandler: any, container: any, validator: any, configMiddleware: any) => {

  const router = Router();
  router.use(logMiddleware);

  const apiRouter = Router();

  apiRouter.use(cors())
    .use(container)
    .use(bodyParser.json())
    .use(compression())
    .use(validator)
    .use(configMiddleware)
    .get("/", (_req, res) => {
      res.send("Welcome to swyp business API");
    })
    .use("/workstations", WorkstationController.router)
    .use("/businesses", BusinessController.router)
    .use("/responses", ResponseController.router)
    .use("/forms", FormController.router);

  router.use("/api/v1", apiRouter)
    .use(errorHandler);

  return router;
};
