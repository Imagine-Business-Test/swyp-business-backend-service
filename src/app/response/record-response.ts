import { ResponseRepository, FormRepository } from "../../contracts/repositories";
import { User } from "../../contracts/domain";
import { Operation } from "../operation";


export class RecordResponse extends Operation {
  private responseRepository: ResponseRepository;
  private formResponse: FormRepository;

  constructor(responseRepository: ResponseRepository, formRepository: FormRepository) {
    super();
    this.responseRepository = responseRepository;
    this.formResponse       = formRepository;
  }

  async execute(command: { form: string, content: string, user: User}) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { content, user } = command;

      const form     = await this.formResponse.find(command.form);
      const response = await this.responseRepository.add(form.createResponse(content, user));
      return this.emit(SUCCESS, response);
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

RecordResponse.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
