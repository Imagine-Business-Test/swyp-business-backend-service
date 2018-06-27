import { ResponseRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";

export class ProcessResponse extends Operation {
  private responseRepository: ResponseRepository;

  constructor(responseRepository: ResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  async execute(command: { response: string, processor: LoggedInUser }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    const { response, processor } = command;
    try {
      await this.responseRepository.makeAsprocessed(response, processor);
      return this.emit(SUCCESS, { processed: true });
      // emit response processed event
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

ProcessResponse.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
