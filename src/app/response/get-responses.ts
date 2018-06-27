import { Operation } from "../operation";
import { ResponseRepository } from "../../contracts/repositories";

export class GetResponse extends Operation {
  private responseRepository: ResponseRepository;

  constructor(responseRepository: ResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  async execute(command: { page: number, limit: number }) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const result = await this.responseRepository.find(command.page, command.limit);
      this.emit(SUCCESS, result);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetResponse.setOutputs(["SUCCESS", "ERROR"]);
