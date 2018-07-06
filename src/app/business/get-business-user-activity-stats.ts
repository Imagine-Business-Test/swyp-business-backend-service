import { IResponseRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetBusinessUserActivityStats extends Operation {
  private responseRepository: IResponseRepository;

  constructor(responseRepository: IResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  public async execute() {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const [processActivity, notingActivity] = await Promise.all([
        this.responseRepository.getProcessingActivityStats(),
        this.responseRepository.getNotingActivityStats()
      ]);
      this.emit(SUCCESS, { processActivity, notingActivity });
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetBusinessUserActivityStats.setOutputs(["SUCCESS", "ERROR"]);
