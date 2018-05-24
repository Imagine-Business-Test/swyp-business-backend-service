import { Server } from "../contracts/interfaces";
import { Logger } from "../contracts/infra";

export class Application {
  server: Server;
  database: any;
  logger: Logger;

  constructor(server: Server, database: any, logger: Logger) {
    this.database = database;
    this.logger   = logger;
    this.server   = server;
  }

  async start() {
    if (this.database) {
      this.database.authenticate(this.logger);
    }
    await this.server.start();
  }
}
