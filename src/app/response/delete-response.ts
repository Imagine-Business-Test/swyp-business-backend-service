import { ResponseRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class DeleteResponse extends Operation {
  private responseRepository: ResponseRepository;

  constructor(responseRepo: ResponseRepository) {
    super();
    this.responseRepository = responseRepo;
  }

  async execute(command: { response: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      await this.responseRepository.delete(command.response);
      this.emit(SUCCESS, { deleted: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

DeleteResponse.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
