import { LogStream } from "../../../infra/logging";
import { Logger } from "../../../contracts/infra";
import morgan from "morgan";


export const logMiddleware = (logger: Logger) => {
  return morgan("dev", {
    stream: LogStream.toStream(logger)
  });
};
