import { IResponseRepository } from "../../contracts/repositories";
import { ILoggedInUser } from "../../contracts/interfaces";
import { IProcessor } from "../../contracts/infra";
import { Operation } from "../operation";

export class OfficialSignoff extends Operation {
  private repository: IResponseRepository;

  constructor(responseRepository: IResponseRepository) {
    super();
    this.repository = responseRepository;
  }

  public async execute(command: {
    user: ILoggedInUser;
    signatureUrl: string;
    id: string;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { user, signatureUrl, id } = command;
      const processor: IProcessor = {
        ...user,
        signatureUrl
      };
      await this.repository.updateProcessors(id, processor);
      return this.emit(SUCCESS, { updated: true });
    } catch (error) {
      if (error.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

OfficialSignoff.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
