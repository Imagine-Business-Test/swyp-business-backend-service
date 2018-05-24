import { Operation } from "../operation";
import { BusinessRepositoryInterface } from "../../contracts/repositories/business";

export class AddBusinessAccount extends Operation {

  private businessRepository: BusinessRepositoryInterface;

  constructor(businessRepository: BusinessRepositoryInterface) {
    super();
    this.businessRepository = businessRepository;
  }

  async execute(command: { businessId: string, account: Account}) {

    const {SUCCESS, ERROR, DATABASE_ERROR} = this.outputs;
    try {
      const { businessId, account } = command;

      const business = this.businessRepository.addAccount(businessId, account);
      this.emit(SUCCESS, business);
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

AddBusinessAccount.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);


