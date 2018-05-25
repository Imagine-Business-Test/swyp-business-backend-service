import { Operation } from "../operation";
import { FormRepository, WorkstationRepository } from "../../contracts/repositories";
import { LoggedInUser } from "../../contracts/interfaces";

export class CreateForm extends Operation {
  private formRepository: FormRepository;
  private workstationRepository: WorkstationRepository;

  constructor(formRepo: FormRepository, workRepo: WorkstationRepository) {
    super();
    this.workstationRepository = workRepo;
    this.formRepository        = formRepo;
  }


  async execute(
    command: { workstationId: string, name: string, content: string, user: LoggedInUser}
  ) {

    const { SUCCESS, ERROR, DATABASE_ERROR, NOTFOUND } = this.outputs;
    try {
      const { workstationId, name, content, user } = command;

      const workstation = await this.workstationRepository.find(workstationId);
      const form        = await this.formRepository.add(
        workstation.createForm(name, content, user)
      );

      this.emit(SUCCESS, form);
    } catch (ex) {
      if (ex.message === "NotFound") {
        this.emit(NOTFOUND, ex);
      }
      if (ex.message === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      }
      this.emit(ERROR, ex);
    }
  }
}

CreateForm.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR", "NOTFOUND"]);
