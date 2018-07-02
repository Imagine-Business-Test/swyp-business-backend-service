import { Operation } from "../operation";
import { ResponseRepository } from "../../contracts/repositories";

export class GetBusinessUserActivityStats extends Operation {
  private responseRepository: ResponseRepository;

  constructor(responseRepository: ResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  async execute() {
    const {SUCCESS, ERROR } = this.outputs;
    try {
      const [
        processActivity,
        notingActivity
      ] = await Promise.all([
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
