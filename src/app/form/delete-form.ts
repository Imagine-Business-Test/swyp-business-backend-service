import { ILoggedInUser } from "../../contracts/interfaces";
import { IFormRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class DeleteForm extends Operation {
  private formRepository: IFormRepository;

  constructor(formRepository: IFormRepository) {
    super();
    this.formRepository = formRepository;
  }

  public async execute(command: { form: string; user: ILoggedInUser }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      await this.formRepository.delete(command.form, command.user);
      return this.emit(SUCCESS, { deleted: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

DeleteForm.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
