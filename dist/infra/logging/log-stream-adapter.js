"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogStream = {
    toStream(logger) {
        return {
            write(message) {
                logger.info(message.slice(0, -1));
            }
        };
    }
};
//# sourceMappingURL=log-stream-adapter.js.map