import { WorkStationRepositoryInterface } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetWorkstations extends Operation {
  private workstationRepository: WorkStationRepositoryInterface;

  constructor(workstationRepo: WorkStationRepositoryInterface) {
    super();
    this.workstationRepository = workstationRepo;
  }

  async execute(command: { business: string }) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const workstations = await this.workstationRepository.findByBusiness(command.business);

      this.emit(SUCCESS, workstations);
    } catch (ex) {
      this.emit(ERROR, ex);
    }
  }
}

GetWorkstations.setOutputs(["SUCCESS", "ERROR"]);
