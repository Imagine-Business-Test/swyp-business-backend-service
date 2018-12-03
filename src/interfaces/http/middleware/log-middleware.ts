import morgan from "morgan";
import { Logger } from "../../../contracts/infra";
import { LogStream } from "../../../infra/logging";

export const logMiddleware = (logger: Logger) => {
  return morgan("dev", {
    stream: LogStream.toStream(logger)
  });
};
