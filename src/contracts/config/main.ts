import { ILogging } from "./logging";
import { IMail } from "./mail";

export interface IConfig {
  process: { port: string; env: string; type: string };
  web: { json_secret: string };
  db: { mongo_url: string };
  logging: ILogging;
  mail: IMail;
}
