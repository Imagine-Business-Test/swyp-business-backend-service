import { Server } from "../../contracts/interfaces";
import { Config } from "../../contracts/config";
import { Logger } from "../../contracts/infra";
import express from "express";

export class HttpServer implements Server {
  protected config: Config;
  protected logger: Logger;
  private express: any;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;
    this.express = express();
  }

  start() {
    return new Promise(resolve => {
      const http = this.express
        .listen(this.config.process.port, () => {
          const port = http.address();
          this.logger.info(`[P ${ process.pid }] Listening at port ${ port }`);
          resolve();
        });
    });
  }
}
