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
      const [processingActivity, notingActivity] = await Promise.all([
        this.responseRepository.getProcessingActivityStats(),
        this.responseRepository.getNotingActivityStats()
      ]);
      const result = this.statsMerger({ processingActivity, notingActivity });
      this.emit(SUCCESS, result);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }

  private statsMerger(stats: any) {
    const usersStats: any = []; // ["hee" {name: "", notes: 0, processed: 0}]
    const processing = stats.processingActivity;
    const noting = stats.notingActivity;
    stateMerger(processing, usersStats, "processed");
    stateMerger(noting, usersStats, "notes");
    return usersStats;
  }
}

GetBusinessUserActivityStats.setOutputs(["SUCCESS", "ERROR"]);

const stateMerger = (dirtyStats: any, cleanStats: any, countName: string) => {
  dirtyStats.forEach((dStatObj: any) => {
    const userIndex = cleanStats.findIndex(
      (cStatObj: any) => cStatObj.name === dStatObj._id
    );
    if (userIndex === -1) {
      const obj: any = { name: dStatObj._id };
      obj[countName] = dStatObj.count;
      cleanStats.push(obj);
    } else {
      const user = { ...cleanStats[userIndex] };
      user[countName] = dStatObj.count;
      cleanStats[userIndex] = user;
    }
  });
  return cleanStats;
};
