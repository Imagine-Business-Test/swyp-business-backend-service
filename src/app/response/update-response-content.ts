import { Operation } from "../operation";
import { ResponseRepository } from "../../contracts/repositories";

export class UpdateResponseContent extends Operation {
  private responseRepository: ResponseRepository;

  constructor(responseRepository: ResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  async execute(command: {response: string, content: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { response, content } = command;
      await this.responseRepository.updateContent(response, content);
      return this.emit(SUCCESS, { updated: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

UpdateResponseContent.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
