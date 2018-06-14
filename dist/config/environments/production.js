"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("../components");
const components_2 = require("../components");
const components_3 = require("../components");
const components_4 = require("../components");
const config = Object.assign({}, components_1.commons, { web: components_3.web,
    db: components_4.db,
    mail: components_2.mail, logging: {
        appenders: {
            "out": { type: "stdout" }
        },
        categories: {
            default: { appenders: ["out"], level: "all" }
        }
    } });
module.exports = config;
//# sourceMappingURL=production.js.map