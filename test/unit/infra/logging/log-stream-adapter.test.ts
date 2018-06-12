import { LogStream } from "../../../../src/infra/logging/log-stream-adapter";
import config  from "../../../../src/config";
import logger from "log4js";

const fakeLogger = logger.configure(config.logging).getLogger();

describe("Infra :: logging :: LogStream", () => {
  test("Wraps the logger into a steam", () => {
    expect( typeof LogStream.toStream(fakeLogger).write).toBe("function");
  });

  test("Removes the \\n character from the message", () => {
    LogStream.toStream(fakeLogger).write("Sliced message\n");
  });
});
