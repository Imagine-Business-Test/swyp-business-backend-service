import { IResponseRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class UpdateResponseContent extends Operation {
  private responseRepository: IResponseRepository;

  constructor(responseRepository: IResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  public async execute(command: { response: string; content: string }) {
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
