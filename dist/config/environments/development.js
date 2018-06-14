"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("../components");
const components_2 = require("../components");
const components_3 = require("../components");
const components_4 = require("../components");
const path_1 = __importDefault(require("path"));
const logPath = path_1.default.join(__dirname, "../../../logs/development.log");
const config = Object.assign({}, components_1.commons, { web: components_2.web,
    db: components_3.db,
    mail: components_4.mail, logging: {
        appenders: {
            console: { type: "console" },
            everything: { type: "file", filename: logPath }
        },
        categories: {
            default: { appenders: ["everything", "console"], level: "debug" }
        }
    } });
module.exports = config;
//# sourceMappingURL=development.js.map