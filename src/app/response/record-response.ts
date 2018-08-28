import { IUser } from "../../contracts/domain";
import { IBranch } from "../../contracts/infra";
import {
  IFormRepository,
  IResponseRepository
} from "../../contracts/repositories";
import { Operation } from "../operation";

export class RecordResponse extends Operation {
  private responseRepository: IResponseRepository;
  private formResponse: IFormRepository;

  constructor(
    responseRepository: IResponseRepository,
    formRepository: IFormRepository
  ) {
    super();
    this.responseRepository = responseRepository;
    this.formResponse = formRepository;
  }

  public async execute(command: {
    form: string;
    content: string;
    user: IUser;
    branch: IBranch;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { content, user, branch } = command;
      const form = await this.formResponse.findBySlug(command.form);
      await this.responseRepository.add(
        form.createResponse(content, user, branch)
      );
      return this.emit(SUCCESS, {});
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

RecordResponse.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
