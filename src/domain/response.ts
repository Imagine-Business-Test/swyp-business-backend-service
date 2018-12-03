import { IForm, IUser, IResponseContent } from "../contracts/domain";
import { ILoggedInUser } from "../contracts/interfaces";
export class Response {
  private processor?: ILoggedInUser;
  private notedBy?: ILoggedInUser;
  private deleted: boolean;
  private respondant: IUser;
  private updatedAt?: Date;
  private createdAt?: Date;
  private content: [IResponseContent];
  private status: string;
  private id?: string;
  private form: IForm;
  private notes?: [string];
  private branch: string;

  constructor(
    respondant: IUser,
    branch: string,
    form: IForm,
    content: [IResponseContent],
    status: string,
    deleted: boolean,
    id?: string,
    notes?: [string],
    processor?: ILoggedInUser,
    notedBy?: ILoggedInUser,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.processor = processor;
    this.respondant = respondant;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.branch = branch;
    this.deleted = deleted;
    this.content = content;
    this.notedBy = notedBy;
    this.status = status;
    this.form = form;
    this.notes = notes;
    this.id = id;
  }

  public getLastMoficationDate(): Date {
    return this.updatedAt!;
  }

  public getProcessor(): ILoggedInUser {
    return this.processor!;
  }

  public getNoter(): ILoggedInUser {
    return this.notedBy!;
  }

  public getNote(): [string] {
    return this.notes!;
  }

  public isDeleted(): boolean {
    return this.deleted;
  }

  public getRespondant(): IUser {
    return this.respondant;
  }

  public getCreationDate(): Date {
    return this.createdAt!;
  }

  public getContent(): [IResponseContent] {
    return this.content;
  }

  public getStatus(): string {
    return this.status;
  }

  public getForm(): IForm {
    return this.form;
  }

  public getBranch(): string {
    return this.branch;
  }

  public getId(): string {
    return this.id!;
  }
}
