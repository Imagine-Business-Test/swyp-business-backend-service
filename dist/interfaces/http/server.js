"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class HttpServer {
    constructor(config, logger, router) {
        this.config = config;
        this.logger = logger;
        this.router = router;
        this.express = express_1.default();
        this.express.disable("x-powered-by");
        this.express.use(this.router);
    }
    start() {
        return new Promise(resolve => {
            const http = this.express
                .listen(this.config.process.port, () => {
                const { port } = http.address();
                this.logger.info(`[P ${process.pid}] Listening at port ${port}`);
                resolve();
            });
        });
    }
}
exports.HttpServer = HttpServer;
//# sourceMappingURL=server.js.map