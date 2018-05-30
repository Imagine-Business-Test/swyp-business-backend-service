import { Config as Interface } from "../../contracts/config";
import { commons } from "../components";
import { mail } from "../components";
import { web } from "../components";
import { db } from "../components";

const config: Interface = {
  ...commons,
  web,
  db,
  mail,
  logging: {
    appenders: {
      "out": { type: "stdout" }
    },
    categories: {
      default: { appenders: ["out"], level: "all" }
    }
  }
};

module.exports = config;

