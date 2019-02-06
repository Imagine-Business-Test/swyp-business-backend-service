import { IConfig as Interface } from "../../contracts/config";
import { commons, db, mail, web, AWS } from "../components";
import path from "path";

const logPath = path.join(__dirname, "../../../logs/development.log");

const config: Interface = {
  ...commons,
  AWS,
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
