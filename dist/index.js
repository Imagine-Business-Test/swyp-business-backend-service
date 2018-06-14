"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
if (config_1.default.process.type === "web") {
    require("./interfaces/http");
}
else if (config_1.default.process.type === "worker") {
    require("./interfaces/worker");
}
else {
    throw new Error(`${config_1.default.process.type} is not supported.`);
}
//# sourceMappingURL=index.js.map