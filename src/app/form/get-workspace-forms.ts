import { Operation } from "../operation";
import { FormRepository } from "../../contracts/repositories";

export class GetWorkspaceForms extends Operation {
  private formRepository: FormRepository;

  constructor(formRepository: FormRepository) {
    super();
    this.formRepository = formRepository;
  }

  async execute(command: { workspace: string }) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const forms = await this.formRepository.getByWorkspace(command.workspace);
      return this.emit(SUCCESS, forms);
    } catch (ex) {
      return this.emit(ERROR, ex);
    }
  }
}

GetWorkspaceForms.setOutputs(["SUCCESS", "ERROR"]);
