import { FormRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetSimilarForms extends Operation {
  private formRepository: FormRepository;

  constructor(formRepository: FormRepository) {
    super();
    this.formRepository = formRepository;
  }

  async execute(command: { business: string }) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const formRecords = await this.formRepository.getByBusiness(command.business);
      this.emit(SUCCESS, formRecords);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetSimilarForms.setOutputs(["SUCCESS", "ERROR"]);
