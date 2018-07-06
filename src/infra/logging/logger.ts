import log4js from "log4js";
import { IConfig as ConfigInterface } from "../../contracts/config";
import { Logger as LoggerInterface } from "../../contracts/infra";

export const Logger = (config: ConfigInterface): LoggerInterface => {
  log4js.configure(config.logging);
  return log4js.getLogger();
};
