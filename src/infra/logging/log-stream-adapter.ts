import { Logger as LoggerInterface } from "../../contracts/infra";

export const LogStream = {
  toStream(logger: LoggerInterface ) {
    return {
      write(message: string) {
        logger.info(message.slice(0, -1));
      }
    };
  }
};

