import { IFormRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetFormContent extends Operation {
  private formRepository: IFormRepository;
  constructor(formRepository: IFormRepository) {
    super();
    this.formRepository = formRepository;
  }

  public async execute(command: {
    formTypeParent: string;
    businessSlug: string;
    formSlug: string;
    formType: string;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    try {
      const form = await this.formRepository.fetchContentOf(command);
      return this.emit(SUCCESS, form);
    } catch (error) {
      if (error.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

GetFormContent.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
