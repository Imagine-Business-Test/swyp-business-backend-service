import { FormRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";


export class UpdateFormContent extends Operation {
  private formRepository: FormRepository;

  constructor(formRepo: FormRepository) {
    super();
    this.formRepository = formRepo;
  }

  async execute(command: {form: string, content: string, modifier: LoggedInUser}) {
    const { SUCCESS, ERROR, DATABSE_ERROR } = this.outputs;

    try {
      const { form, content, modifier } = command;

      await this.formRepository.updateContent(form, content, modifier);
      this.emit(SUCCESS, { updated: true });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABSE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

UpdateFormContent.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
