import { ResponseRepository, FormRepository } from "../../contracts/repositories";
import { User } from "../../contracts/domain";
import { Operation } from "../operation";


export class RecordResponse extends Operation {
  private responseRepository: ResponseRepository;
  private formResponse: FormRepository;

  constructor(responseRepo: ResponseRepository, formRepo: FormRepository) {
    super();
    this.responseRepository = responseRepo;
    this.formResponse       = formRepo;
  }

  async execute(command: { form: string, content: string, user: User}) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { content, user } = command;

      const form     = await this.formResponse.find(command.form);
      const response = await this.responseRepository.add(form.createResponse(content, user));
      this.emit(SUCCESS, response);
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

RecordResponse.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
