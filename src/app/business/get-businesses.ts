import { IBusinessRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetBusinesses extends Operation {
  private businessRepository: IBusinessRepository;
  constructor(businessRepository: IBusinessRepository) {
    super();
    this.businessRepository = businessRepository;
  }

  public async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const businesses = await this.businessRepository.fetchAll();
      this.emit(SUCCESS, businesses);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetBusinesses.setOutputs(["SUCCESS", "ERROR"]);
