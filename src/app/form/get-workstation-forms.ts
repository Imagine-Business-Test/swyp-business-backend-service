import { Operation } from "../operation";
import { FormRepository } from "../../contracts/repositories";

export class GetWorkstationForms extends Operation {
  private formRepository: FormRepository;

  constructor(formRepo: FormRepository) {
    super();
    this. formRepository = formRepo;
  }

  async execute(command: { workstation: string }) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const forms = await this.formRepository.getByWorkstation(command.workstation);
      this.emit(SUCCESS, forms);
    } catch (ex) {
      this.emit(ERROR, ex);
    }
  }
}

GetWorkstationForms.setOutputs(["SUCCESS", "ERROR"]);
