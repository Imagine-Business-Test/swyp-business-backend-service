import { ILoggedInUser } from "../../contracts/interfaces";
import { IFormRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class DisableForm extends Operation {
  private formRepository: IFormRepository;

  constructor(formRepository: IFormRepository) {
    super();
    this.formRepository = formRepository;
  }

  public async execute(command: { form: string; user: ILoggedInUser }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      await this.formRepository.disable(command.form, command.user);
      return this.emit(SUCCESS, { disabled: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

DisableForm.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
