import express from "express";
import { IConfig } from "../../contracts/config";
import { Logger } from "../../contracts/infra";
import { IServer } from "../../contracts/interfaces";

export class HttpServer implements IServer {
  private config: IConfig;
  private logger: Logger;
  private express: any;
  private router: any;

  constructor(config: IConfig, logger: Logger, router: any) {
    this.config = config;
    this.logger = logger;
    this.router = router;
    this.express = express();

    this.express.disable("x-powered-by");
    this.express.use(this.router);
  }

  public start() {
    return new Promise(resolve => {
      const http = this.express.listen(this.config.process.port, () => {
        const { port } = http.address();
        this.logger.info(`[P ${process.pid}] Listening at port ${port}`);
        resolve();
      });
    });
  }
}
