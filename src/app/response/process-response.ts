import { ResponseRepository } from "../../contracts/repositories";
import { Operation } from "../operation";


export class ProcessResponse extends Operation {
  private responseRepository: ResponseRepository;

  constructor(responseRepository: ResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  async execute(command: { response: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    try {
      await this.responseRepository.makeAsprocessed(command.response);
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
