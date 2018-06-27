import { Operation } from "../operation";
import { ResponseRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";

export class AddNoteToResponse extends Operation {
  private responseRepository: ResponseRepository;

  constructor(responseRepository: ResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  async execute(command: { responseId: string, note: string, user: LoggedInUser }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    const { responseId, note, user } = command;
    try {
      await this.responseRepository.addNote(responseId, note, user);
      return this.emit(SUCCESS, { updated: true });
    } catch (error) {
      if (error.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}


AddNoteToResponse.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
