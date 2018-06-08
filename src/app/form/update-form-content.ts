import { FormRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";


export class UpdateFormContent extends Operation {
  private formRepository: FormRepository;

  constructor(formRepository: FormRepository) {
    super();
    this.formRepository = formRepository;
  }

  async execute(command: {form: string, content: string, modifier: LoggedInUser}) {
    const { SUCCESS, ERROR, DATABSE_ERROR } = this.outputs;

    try {
      const { form, content, modifier } = command;

      await this.formRepository.updateContent(form, content, modifier);
      return this.emit(SUCCESS, { updated: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABSE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

UpdateFormContent.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
