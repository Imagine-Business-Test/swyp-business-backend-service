import { Operation } from "../operation";
import { ResponseRepository } from "../../contracts/repositories";

export class ProcessResponse extends Operation {
  private responseRepository: ResponseRepository;

  constructor(responseRepo: ResponseRepository) {
    super();
    this.responseRepository = responseRepo;
  }

  async execute(command: { response: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      await this.responseRepository.makeAsprocessed(command.response);
      this.emit(SUCCESS, { processed: true });
      // emit response processed event
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

ProcessResponse.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
