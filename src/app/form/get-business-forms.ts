import { IFormRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetBusinessForms extends Operation {
  private formRepository: IFormRepository;

  constructor(formRepository: IFormRepository) {
    super();
    this.formRepository = formRepository;
  }

  public async execute(command: { business: string }) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const formRecords = await this.formRepository.getByBusiness(
        command.business
      );
      this.emit(SUCCESS, formRecords);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetBusinessForms.setOutputs(["SUCCESS", "ERROR"]);
