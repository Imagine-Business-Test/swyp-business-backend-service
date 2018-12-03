import { IFormRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetBusinessForms extends Operation {
  private formRepository: IFormRepository;

  constructor(formRepository: IFormRepository) {
    super();
    this.formRepository = formRepository;
  }

  public async execute(command: { business: string; formtype: string }) {
    const { SUCCESS, ERROR } = this.outputs;
    const { business } = command;
    let { formtype } = command;
    formtype = formtype[0].toUpperCase() + formtype.slice(1);
    try {
      const formRecords = await this.formRepository.fetchByBusiness(
        business,
        formtype
      );
      this.emit(SUCCESS, formRecords);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetBusinessForms.setOutputs(["SUCCESS", "ERROR"]);
