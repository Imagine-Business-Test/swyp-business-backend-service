import { FormRepository, WorkstationRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";

export class CreateForm extends Operation {
  private formRepository: FormRepository;
  private workstationRepository: WorkstationRepository;

  constructor(formRepository: FormRepository, workstationRepository: WorkstationRepository) {
    super();
    this.workstationRepository = workstationRepository;
    this.formRepository        = formRepository;
  }

  async execute(
    command: { workstation: string, name: string, content: string, user: LoggedInUser}
  ) {

    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    try {
      const { workstation, name, content, user } = command;

      const workstationRecord = await this.workstationRepository.find(workstation);
      const form        = await this.formRepository.add(
        workstationRecord.createForm(name, content, user)
      );

      return this.emit(SUCCESS, form);
    } catch (ex) {
      if (ex.message === "DatabaseError") {
        return this.emit(DATABASE_ERROR, ex);
      }
      return this.emit(ERROR, ex);
    }
  }
}

CreateForm.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
