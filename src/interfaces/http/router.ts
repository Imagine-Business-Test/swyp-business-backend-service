import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import { Router } from "express";


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
    });

  router.use("/api/v1", apiRouter)
    .use(errorHandler);

  return router;
};
