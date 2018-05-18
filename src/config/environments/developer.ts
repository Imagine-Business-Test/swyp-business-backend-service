import { Config as Interface } from "../../contracts/config";
import { commons } from "../components";
import { web } from "../components";
import { db } from "../components";

const config: Interface = {
  ...commons,
  web,
  db,
  logging: {
    appenders: {
      "out": { type: "stdout" }
    },
    categories: {
      default: { appenders: ["out"], level: "debug" }
    }
  }
};

exports.config = config;

