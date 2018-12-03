import { EventEmitter } from "events";
const define = Object.defineProperty;

export class Operation extends EventEmitter {
  public static setOutputs(outputs: string[]) {
    define(this.prototype, "outputs", {
      value: createOutputs(outputs)
    });
  }

  public outputs: any;
}

const createOutputs = (outputs: string[]) => {
  return outputs.reduce((accumulator: any, output: string) => {
    accumulator[output] = output;
    return accumulator;
  }, Object.create(null));
};
