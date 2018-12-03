/* tslint:disable: no-var-requires prefer-conditional-expression */

import path from "path";
const NODE_ENV = process.env.NODE_ENV as string;

let result = "";

if (NODE_ENV === "test") {
  result = require(path.join(__dirname, "environments", "production"));
} else {
  result = require(path.join(__dirname, "environments", "development"));
}

module.exports = result;
