import { IForm, IUser } from "../contracts/domain";
import { ILoggedInUser } from "../contracts/interfaces";

export class Response {
  private processor?: ILoggedInUser;
  private notedBy?: ILoggedInUser;
  private deleted: boolean;
  private respondant: IUser;
  private updatedAt?: Date;
  private createdAt?: Date;
  private content: any;
  private status: string;
  private id?: string;
  private form: IForm;
  private note?: string;

  constructor(
    respondant: IUser,
    form: IForm,
    content: string,
    status: string,
    deleted: boolean,
    id?: string,
    note?: string,
    processor?: ILoggedInUser,
    notedBy?: ILoggedInUser,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.processor = processor;
    this.respondant = respondant;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deleted = deleted;
    this.content = content;
    this.notedBy = notedBy;
    this.status = status;
    this.form = form;
    this.note = note;
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

  public getNote(): string {
    return this.note!;
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

  public getContent(): any {
    return this.content;
  }

  public getStatus(): string {
    return this.status;
  }

  public getForm(): IForm {
    return this.form;
  }

  public getId(): string {
    return this.id!;
  }
}
