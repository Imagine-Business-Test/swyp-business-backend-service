import { EventEmitter } from "events";
const define = Object.defineProperty;

export class Operation  extends EventEmitter {
  public outputs: any;

  static setOutputs(outputs: string[]) {
    define(this.prototype, "outputs", {
      value: createOutputs(outputs)
    });
  }
}

const createOutputs = (outputs: string[]) => {
  return outputs.reduce((accumulator: any,  output: string) => {
    accumulator[output] = output;
    return accumulator;
  }, Object.create(null));
};
