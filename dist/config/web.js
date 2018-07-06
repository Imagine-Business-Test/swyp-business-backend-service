"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const NODE_ENV = process.env.NODE_ENV;
let result = "";
if (NODE_ENV === "test") {
    result = require(path_1.default.join(__dirname, "environments", "production"));
}
else {
    result = require(path_1.default.join(__dirname, "environments", "development"));
}
module.exports = result;
//# sourceMappingURL=web.js.map