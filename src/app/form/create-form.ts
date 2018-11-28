import { IWorkspace, IBusiness, Ielement } from "../../contracts/domain";
import { ILoggedInUser } from "../../contracts/interfaces";
import { Operation } from "../operation";
import {
  IFormRepository,
  IBusinessRepository,
  IWorkspaceRepository
} from "../../contracts/repositories";
import { Form } from "../../domain";
import slug from "slug";

export class CreateForm extends Operation {
  private formRepository: IFormRepository;
  private businessRepo: IBusinessRepository;
  private workspaceRepo: IWorkspaceRepository;

  constructor(
    formRepository: IFormRepository,
    businessRepository: IBusinessRepository,
    workspaceRepository: IWorkspaceRepository
  ) {
    super();
    this.workspaceRepo = workspaceRepository;
    this.businessRepo = businessRepository;
    this.formRepository = formRepository;
  }

  public async execute(command: {
    name: string;
    elements: [Ielement];
    formTypeId: string;
    elementCount: number;
    user: ILoggedInUser;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    try {
      const { formTypeId, name, elements, user } = command;
      const workspaceRecord = await this.workspaceRepo.find(formTypeId);
      const partner = await this.businessRepo.findByAccountEmail(user.email);
      const formtype: IWorkspace = {
        id: workspaceRecord.getId(),
        name: workspaceRecord.getName(),
        parent: workspaceRecord.getParent()
      };
      const business: IBusiness = {
        id: partner.getId(),
        name: partner.getName()
      };
      const nameSlug = slug(name);
      const status = "active";
      const form = await this.formRepository.add(
        new Form(
          name,
          nameSlug,
          formtype,
          business,
          elements,
          status,
          user,
          user,
          false
        )
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
