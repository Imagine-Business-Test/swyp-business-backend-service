"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const define = Object.defineProperty;
class Operation extends events_1.EventEmitter {
    static setOutputs(outputs) {
        define(this.prototype, "outputs", {
            value: createOutputs(outputs)
        });
    }
}
exports.Operation = Operation;
const createOutputs = (outputs) => {
    return outputs.reduce((accumulator, output) => {
        accumulator[output] = output;
        return accumulator;
    }, Object.create(null));
};
//# sourceMappingURL=operation.js.map