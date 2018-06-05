import { WorkstationRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetBusinessWorkstations extends Operation {
  private workstationRepository: WorkstationRepository;

  constructor(workstationRepository: WorkstationRepository) {
    super();
    this.workstationRepository = workstationRepository;
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

GetBusinessWorkstations.setOutputs(["SUCCESS", "ERROR"]);
