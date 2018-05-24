import { Operation } from "../operation";
import { BusinessRepositoryInterface } from "../../contracts/repositories/business";
import { Business } from "../../domain";

export class CreateBusiness extends Operation {
  private businessRepository: BusinessRepositoryInterface;

  constructor(businessRepository: BusinessRepositoryInterface) {
    super();
    this.businessRepository = businessRepository;
  }

  async execute(command: {name: string, logoUrl: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { name, logoUrl } = command;
      const business = new Business(name, logoUrl);
      const savedBusiness = this.businessRepository.add(business);

      this.emit(SUCCESS, savedBusiness);
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

CreateBusiness.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
