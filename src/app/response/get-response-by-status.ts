import { Operation } from "../operation";
import { ResponseRepository } from "../../contracts/repositories";

export class GetResponseByStatus extends Operation {
  private responseRepository: ResponseRepository;

  constructor(responseRepository: ResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  async execute(command: { status: string, page: number, limit: number }) {
    const { SUCCESS, ERROR } = this.outputs;
    const { status, page, limit } = command;
    try {
      const result = await this.responseRepository.findBStatus(status, page, limit);
      this.emit(SUCCESS, result);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetResponseByStatus.setOutputs(["SUCCESS", "ERROR"]);
