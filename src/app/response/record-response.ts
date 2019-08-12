import { IUser, IResponseContent } from "../../contracts/domain";
import {
  IFormRepository,
  IResponseRepository
} from "../../contracts/repositories";
import { Operation } from "../operation";
import { Mailer } from "../../services";

export class RecordResponse extends Operation {
  private responseRepository: IResponseRepository;
  private formResponse: IFormRepository;
  private mailer: Mailer;

  constructor(
    responseRepository: IResponseRepository,
    formRepository: IFormRepository,
    mailer: Mailer
  ) {
    super();
    this.responseRepository = responseRepository;
    this.formResponse = formRepository;
    this.mailer = mailer;
  }

  public async execute(command: {
    form: string;
    content: [IResponseContent];
    user: IUser;
    branch: string;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;

    try {
      const { content, user, branch } = command;
      const form = await this.formResponse.find(command.form);
      await this.responseRepository.add(
        form.createResponse(content, user, branch)
      );
      let hasEmail = false;
      let email = "",
        firstname = "",
        lastname = "";

      content.forEach((elem: any) => {
        hasEmail = true;
        const { questionType, answer } = elem;
        if (questionType == "email") {
          hasEmail = true;
          email = answer;
        } else if (questionType == "firstname") {
          firstname = answer;
        } else if (questionType == "lastname") {
          lastname = answer;
        }
      });

      if (hasEmail) {
        this.mailer.sendFormSubmitted(`${lastname} ${firstname}`, email);
      }

      return this.emit(SUCCESS, { created: "success" });
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

RecordResponse.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
