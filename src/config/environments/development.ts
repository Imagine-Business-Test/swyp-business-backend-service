import { Config as Interface } from "../../contracts/config";
import { commons } from "../components";
import { web } from "../components";
import { db } from "../components";
import { mail } from "../components";
import path from "path";
const logPath = path.join(__dirname, "../../../logs/development.log");

const config: Interface = {
  ...commons,
  web,
  db,
  mail,
  logging: {
    appenders: {
      console: { type: "console" },
      everything: { type: "file", filename: logPath }
    },
    categories: {
      default: { appenders: ["everything", "console"], level: "debug" }
    }
  }
};

module.exports = config;
