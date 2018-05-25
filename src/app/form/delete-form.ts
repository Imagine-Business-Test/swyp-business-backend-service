import { FormRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";

export class DeleteForm  extends Operation {
  private formRepository: FormRepository;

  constructor(formRepo: FormRepository) {
    super();
    this.formRepository = formRepo;
  }

  async execute(command: {form: string, user: LoggedInUser }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      await this.formRepository.delete(command.form, command.user);
      this.emit(SUCCESS, { deleted: true});
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

DeleteForm.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
