"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("../components");
const config = Object.assign({}, components_1.commons, { web: components_1.web,
    db: components_1.db,
    AWS: components_1.AWS,
    mail: components_1.mail, logging: {
        appenders: {
            out: { type: "stdout" }
        },
        categories: {
            default: { appenders: ["out"], level: "all" }
        }
    } });
module.exports = config;
//# sourceMappingURL=production.js.map