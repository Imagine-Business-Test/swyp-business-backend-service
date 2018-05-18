import { Logging } from "./logging";

export interface Config {
  db: { mongo_url: string };
  logging: Logging;
  web: { json_secret: string };
  process: { port: string, env: string, type: string };
}

