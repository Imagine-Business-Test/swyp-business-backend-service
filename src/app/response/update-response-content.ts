import { Operation } from "../operation";
import { ResponseRepository } from "../../contracts/repositories";

export class UpdateResponseContent extends Operation {
  private responseRepository: ResponseRepository;

  constructor(responseRepo: ResponseRepository) {
    super();
    this.responseRepository = responseRepo;
  }

  async execute(command: {response: string, content: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { response, content } = command;
      await this.responseRepository.updateContent(response, content);
      this.emit(SUCCESS, { updated: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

UpdateResponseContent.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
