/* tslint:disable: no-var-requires */
import dotenv from "dotenv";
import { IConfig } from "../contracts/config";
dotenv.load();

const processType = process.env.PROCESS_TYPE || "web";
let env: IConfig;
try {
  env = require(`./${processType}`);
} catch (exception) {
  if (exception.code === " MODULE_NOT_FOUND") {
    throw new Error(`No config for process type: ${processType}`);
  }
  throw exception;
}

export default env;
