import { ILoggedInUser } from "../../contracts/interfaces";
import { IResponseRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class ProcessResponse extends Operation {
  private responseRepository: IResponseRepository;

  constructor(responseRepository: IResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  public async execute(command: {
    response: string;
    processor: ILoggedInUser;
  }) {
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
