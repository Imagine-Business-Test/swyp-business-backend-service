import dotenv from  "dotenv";
import { Config } from "../contracts/config";

dotenv.load();
const processType = process.env.PROCESS_TYPE;
let env;
try {
  env = require(`./${processType}`);
} catch (exception) {
  if (exception.code === " MODULE_NOT_FOUND") {
    throw new Error(`No config for process type: ${processType}`);
  }
  throw exception;
}

export const config: Config = env.config;
