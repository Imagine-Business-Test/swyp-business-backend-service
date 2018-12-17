import { IResponseRepository } from "../../contracts/repositories";
import { ILoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";

export class AddNoteToResponse extends Operation {
  private responseRepository: IResponseRepository;

  constructor(responseRepository: IResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  public async execute(command: {
    response: string;
    note: string;
    user: ILoggedInUser;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    const { response, note, user } = command;
    try {
      const updatedResponse = await this.responseRepository.addNote(
        response,
        note,
        user
      );
      return this.emit(SUCCESS, updatedResponse);
    } catch (error) {
      if (error.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

AddNoteToResponse.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
