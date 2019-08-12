"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = (config) => {
    return {
        authenticate(logger) {
            return mongoose_1.default
                .connect(config.db.mongo_url)
                .then(() => logger.info("Connection to u database established "))
                .catch(err => logger.error(err.message));
        },
        drop(logger) {
            mongoose_1.default.connect(config.db.mongo_url).then((conn) => {
                conn.db.dropDatabase();
                logger.info("Dropped database");
            });
        }
    };
};
//# sourceMappingURL=index.js.map