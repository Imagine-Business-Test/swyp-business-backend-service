import { Server } from "../contracts/interfaces";
import { Logger } from "../contracts/infra";
import { App } from "../contracts/app";

export class Application implements App {
  private server: Server;
  private database: any;
  private logger: Logger;

  constructor(server: Server, database: any, logger: Logger) {
    this.database = database;
    this.logger   = logger;
    this.server   = server;
  }

  async start() {
    try {
      if (this.database) {
        await this.database.authenticate(this.logger);
      }
      await this.server.start();
    } catch (ex) {
      this.logError(ex);
    }
  }

  private logError(error: Error): void {

    this.logger.error(error.stack!);
  }

}
