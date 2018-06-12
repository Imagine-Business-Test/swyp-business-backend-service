import path from "path";

const NODE_ENV = <string>process.env.NODE_ENV;

if (NODE_ENV === "test") {
  module.exports = require(path.join(__dirname, "environments", "production"));
} else {
  module.exports = require(path.join(__dirname, "environments", "development"));
}
