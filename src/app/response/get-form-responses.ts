import { IResponseRepository } from "../../contracts/repositories";
import { Operation } from "../operation";

export class GetFormResponses extends Operation {
  private responseRepository: IResponseRepository;

  constructor(responseRepository: IResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  public async execute(command: { form: string }) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const responses = await this.responseRepository.getByForm(command.form);
      return this.emit(SUCCESS, responses);
    } catch (ex) {
      return this.emit(ERROR, ex);
    }
  }
}

GetFormResponses.setOutputs(["SUCCESS", "ERROR"]);
