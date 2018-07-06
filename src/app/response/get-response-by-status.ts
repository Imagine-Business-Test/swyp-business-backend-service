import { IResponseRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetResponseByStatus extends Operation {
  private responseRepository: IResponseRepository;

  constructor(responseRepository: IResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  public async execute(command: {
    status: string;
    page: number;
    limit: number;
  }) {
    const { SUCCESS, ERROR } = this.outputs;
    const { status, page, limit } = command;
    try {
      const result = await this.responseRepository.findBStatus(
        status,
        page,
        limit
      );
      this.emit(SUCCESS, result);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetResponseByStatus.setOutputs(["SUCCESS", "ERROR"]);
