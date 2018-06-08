import { ResponseRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class DeleteResponse extends Operation {
  private responseRepository: ResponseRepository;

  constructor(responseRepository: ResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  async execute(command: { response: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      await this.responseRepository.delete(command.response);
      return this.emit(SUCCESS, { deleted: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

DeleteResponse.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
