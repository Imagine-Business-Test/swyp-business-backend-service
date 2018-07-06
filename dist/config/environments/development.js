"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const components_1 = require("../components");
const logPath = path_1.default.join(__dirname, "../../../logs/development.log");
const config = Object.assign({}, components_1.commons, { web: components_1.web,
    db: components_1.db,
    mail: components_1.mail, logging: {
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