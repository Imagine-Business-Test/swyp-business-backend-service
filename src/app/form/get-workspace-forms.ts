import { IFormRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetWorkspaceForms extends Operation {
  private formRepository: IFormRepository;

  constructor(formRepository: IFormRepository) {
    super();
    this.formRepository = formRepository;
  }

  public async execute(command: { workspace: string; businessId: string }) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const forms = await this.formRepository.fetchByWorkspace(
        command.workspace,
        command.businessId
      );
      return this.emit(SUCCESS, forms);
    } catch (ex) {
      return this.emit(ERROR, ex);
    }
  }
}

GetWorkspaceForms.setOutputs(["SUCCESS", "ERROR"]);
