import {
  IResponseContent,
  IProcessors,
  IForm,
  IUser,
  INote
} from "../contracts/domain";
export class Response {
  private processors?: IProcessors;
  private deleted: boolean;
  private respondant: IUser;
  private updatedAt?: Date;
  private createdAt?: Date;
  private content: [IResponseContent];
  private status: string;
  private id?: string;
  private form: IForm;
  private notes?: [INote];
  private branch: string;

  constructor(
    respondant: IUser,
    branch: string,
    form: IForm,
    content: [IResponseContent],
    status: string,
    deleted: boolean,
    id?: string,
    notes?: [INote],
    processors?: IProcessors,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.processors = processors;
    this.respondant = respondant;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.branch = branch;
    this.deleted = deleted;
    this.content = content;
    this.status = status;
    this.form = form;
    this.notes = notes;
    this.id = id;
  }

  public getLastMoficationDate(): Date {
    return this.updatedAt!;
  }

  public getProcessors(): IProcessors {
    return this.processors!;
  }

  public getNotes(): [INote] {
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
