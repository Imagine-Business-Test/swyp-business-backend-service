import { ILoggedInUser } from "../../contracts/interfaces";
import { IFormRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class UpdateFormContent extends Operation {
  private formRepository: IFormRepository;

  constructor(formRepository: IFormRepository) {
    super();
    this.formRepository = formRepository;
  }

  public async execute(command: {
    form: string;
    content: string;
    modifier: ILoggedInUser;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { form, content, modifier } = command;

      await this.formRepository.updateContent(form, content, modifier);
      return this.emit(SUCCESS, { updated: true });
    } catch (ex) {
      if (ex.messa === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

UpdateFormContent.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
