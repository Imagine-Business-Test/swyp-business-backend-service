import { Logging } from "./logging";
import { Mail } from "./mail";

export interface Config {
  process: { port: string, env: string, type: string };
  web: { json_secret: string };
  db: { mongo_url: string };
  logging: Logging;
  mail: Mail;
}

