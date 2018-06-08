import { Operation } from "../operation";
import { FormRepository } from "../../contracts/repositories";

export class GetWorkstationForms extends Operation {
  private formRepository: FormRepository;

  constructor(formRepository: FormRepository) {
    super();
    this.formRepository = formRepository;
  }

  async execute(command: { workstation: string }) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const forms = await this.formRepository.getByWorkstation(command.workstation);
      return this.emit(SUCCESS, forms);
    } catch (ex) {
      return this.emit(ERROR, ex);
    }
  }
}

GetWorkstationForms.setOutputs(["SUCCESS", "ERROR"]);
