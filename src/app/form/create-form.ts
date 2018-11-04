import { ILoggedInUser } from "../../contracts/interfaces";
import { IWorkspace, IBusiness } from "../../contracts/domain";
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
  private businessRepository: IBusinessRepository;
  private workspaceRepository: IWorkspaceRepository;

  constructor(
    formRepository: IFormRepository,
    businessRepository: IBusinessRepository,
    workspaceRepository: IWorkspaceRepository
  ) {
    super();
    this.workspaceRepository = workspaceRepository;
    this.businessRepository = businessRepository;
    this.formRepository = formRepository;
  }

  public async execute(command: {
    name: string;
    content: string;
    workspace: string;
    elementCount: number;
    user: ILoggedInUser;
  }) {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
    try {
      const { workspace, name, content, user, elementCount } = command;
      const partner = await this.businessRepository.findByAccountEmail(
        user.email
      );
      const workspaceRecord = await this.workspaceRepository.find(workspace);
      const status = "active";
      const workspaceData: IWorkspace = {
        id: workspaceRecord.getId(),
        name: workspaceRecord.getName(),
        parent: workspaceRecord.getParent()
      };
      const business: IBusiness = {
        id: partner.getId(),
        name: partner.getName()
      };
      const nameSlug = slug(name);
      const form = await this.formRepository.add(
        new Form(
          name,
          nameSlug,
          workspaceData,
          business,
          content,
          status,
          elementCount,
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
