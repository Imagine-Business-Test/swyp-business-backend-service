import { BusinessRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";

export class DeleteBusinessUser extends Operation {
  private businessRepository: BusinessRepository;

  constructor(businessRepository: BusinessRepository) {
    super();
    this.businessRepository = businessRepository;
  }

  async execute(command: { email: string, modifier: LoggedInUser }) {
    const { SUCCESS, ERROR, DATABASE_ERROR} = this.outputs;
    // do not update record if already deleted
    try {
      await this.businessRepository.deleteAccount(command.email, command.modifier);

      this.emit(SUCCESS, { deleted: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

DeleteBusinessUser.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
