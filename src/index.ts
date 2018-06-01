import { config } from "./config";
const pkg = require("../package.json");
import semver from "semver";


const runtime = {
  expected: <string>semver.validRange(pkg.engines.node),
  actual: <string>semver.valid(process.version)
};

const valid = semver.satisfies(runtime.actual, runtime.expected);
if (!valid) {
  throw new Error(
    `Expected Nodejs version ${ runtime.expected }, but found
    ${ runtime.actual }. Please update or change your runtime`
  );
}

if (config.process.type === "web") {
  require("./interfaces/http");
} else if (config.process.type === "worker") {
  require("./interfaces/worker");
} else {
  throw new Error(`${ config.process.type } is not supported.`);
}


