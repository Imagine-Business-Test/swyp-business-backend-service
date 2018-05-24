import { Config } from "../config";
import { Logger } from "../infra";

export interface Server {
  config: Config;
  logger: Logger;

  start: () => void;
}
