import { IBusinessRepository } from "../../contracts/repositories";
import { ILoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";

export class UpdateBusinessDetails extends Operation {
  private model: IBusinessRepository;
  constructor(businessRepository: IBusinessRepository) {
    super();
    this.model = businessRepository;
  }

  public async execute(command: {
    user: ILoggedInUser;
    description: string;
    logoUrl: string;
    id: string;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    try {
      const { id, logoUrl, description } = command;
      await this.model.updateDetails(id, logoUrl, description);
      return this.emit(SUCCESS, { updated: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

UpdateBusinessDetails.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
