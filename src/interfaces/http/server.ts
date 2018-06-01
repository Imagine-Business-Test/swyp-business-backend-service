import { Server } from "../../contracts/interfaces";
import { Config } from "../../contracts/config";
import { Logger } from "../../contracts/infra";
import express from "express";

export class HttpServer implements Server {
  private config: Config;
  private logger: Logger;
  private express: any;
  private router: any;

  constructor(config: Config, logger: Logger, router: any) {
    this.config = config;
    this.logger = logger;
    this.router = router;
    this.express = express();

    this.express.disable("x-powered-by");
    this.express.use(this.router);
  }

  start() {
    return new Promise(resolve => {
      const http = this.express
        .listen(this.config.process.port, () => {
          const { port } = http.address();
          this.logger.info(`[P ${ process.pid }] Listening at port ${ port }`);
          resolve();
        });
    });
  }
}
