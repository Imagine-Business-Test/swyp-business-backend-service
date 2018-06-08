import { FormRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";

export class DisableForm extends Operation {
  private formRepository: FormRepository;

  constructor(formRepository: FormRepository) {
    super();
    this.formRepository = formRepository;
  }

  async execute(command: {form: string, user: LoggedInUser}) {
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
