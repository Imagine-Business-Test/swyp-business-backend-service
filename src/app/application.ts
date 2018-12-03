import { IApp } from "../contracts/app";
import { Logger } from "../contracts/infra";
import { IServer } from "../contracts/interfaces";

export class Application implements IApp {
  private server: IServer;
  private database: any;
  private logger: Logger;

  constructor(server: IServer, database: any, logger: Logger) {
    this.database = database;
    this.logger = logger;
    this.server = server;
  }

  public async start() {
    try {
      await this.server.start();
      if (this.database) {
        await this.database.authenticate(this.logger);
      }
    } catch (ex) {
      this.logError(ex);
    }
  }

  private logError(error: Error): void {
    this.logger.error(error.stack!);
  }
}
