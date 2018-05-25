import { ResponseRepository } from "../../contracts/repositories";
import { Operation } from "../operation";


export class GetFormResponses extends Operation {
  private responseRepository: ResponseRepository;

  constructor(responseRepo: ResponseRepository) {
    super();
    this.responseRepository = responseRepo;
  }


  async execute(command: { form: string }) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const responses = await this.responseRepository.getByForm(command.form);
      this.emit(SUCCESS, responses);
    } catch (ex) {
      this.emit(ERROR, ex);
    }
  }
}

GetFormResponses.setOutputs(["SUCCESS", "ERROR"]);
