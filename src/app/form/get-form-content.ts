import { IFormRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetFormContent extends Operation {
  private formRepository: IFormRepository;
  constructor(formRepository: IFormRepository) {
    super();
    this.formRepository = formRepository;
  }

  public async execute(command: { slug: string }) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const form = await this.formRepository.findBySlug(command.slug);
      this.emit(SUCCESS, form);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetFormContent.setOutputs(["SUCCESS", "ERROR"]);
