import { Logger as LoggerInterface } from "../../contracts/infra";
import { Config as ConfigInterface } from "../../contracts/config";
import log4js from "log4js";

export const Logger = (config: ConfigInterface): LoggerInterface => {
  log4js.configure(config.logging);
  return log4js.getLogger();
};
