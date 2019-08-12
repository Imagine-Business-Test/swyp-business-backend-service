import { IBusinessRepository } from "../../contracts/repositories";
import { ILoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";

export class UpdateUserDetails extends Operation {
  private model: IBusinessRepository;
  constructor(businessRepository: IBusinessRepository) {
    super();
    this.model = businessRepository;
  }

  public async execute(command: {
    userId: string;
    branch: string;
    user: ILoggedInUser;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    role: string;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      await this.model.updateUser(command.userId, {
        ...command,
        ...{
          id: command.userId,
          name: `${command.firstname} ${command.lastname}`
        }
      });
      const business = await this.model.findByAccountEmail(command.user.email);
      return this.emit(SUCCESS, { business });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

UpdateUserDetails.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
