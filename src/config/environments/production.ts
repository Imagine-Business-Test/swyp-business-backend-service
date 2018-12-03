import { IConfig as Interface } from "../../contracts/config";
import { commons, db, mail, web } from "../components";

const config: Interface = {
  ...commons,
  web,
  db,
  mail,
  logging: {
    appenders: {
      out: { type: "stdout" }
    },
    categories: {
      default: { appenders: ["out"], level: "all" }
    }
  }
};

module.exports = config;
