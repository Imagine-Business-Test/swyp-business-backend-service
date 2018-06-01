import { BusinessRepository } from "../../contracts/repositories";
import { Operation } from "../operation";
import { Business } from "../../domain";

export class CreateBusiness extends Operation {
  private businessRepository: BusinessRepository;

  constructor(businessRepository: BusinessRepository) {
    super();
    this.businessRepository = businessRepository;
  }

  async execute(command: {name: string, logoUrl: string }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { name, logoUrl } = command;
      const business          = new Business(name, logoUrl, []);
      const savedBusiness     = await this.businessRepository.add(business);

      return this.emit(SUCCESS, savedBusiness);
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

CreateBusiness.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
