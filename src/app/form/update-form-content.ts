import { Operation } from "../operation";
import { FormRepository } from "../../contracts/repositories";

export class UpdateFormContent extends Operation {
  private formRepository: FormRepository;

  constructor(formRepo: FormRepository) {
    super();
    this.formRepository = formRepo;
  }

  async execute(command: {form: string, content: string}) {
    const { SUCCESS, ERROR, DATABSE_ERROR } = this.outputs;

    try {
      await this.formRepository.updateContent(command.form, command.content);
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
