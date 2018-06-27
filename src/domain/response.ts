import { User, Form } from "../contracts/domain";
import { LoggedInUser } from "../contracts/interfaces";

export class Response {
  private processor?: LoggedInUser;
  private notedBy?: LoggedInUser;
  private deleted: Boolean;
  private respondant: User;
  private updatedAt?: Date;
  private createdAt?: Date;
  private content: string;
  private status: string;
  private _id?: string;
  private form: Form;
  private note?: string;



  constructor(
    respondant: User, form: Form, content: string, status: string, deleted: Boolean, _id?: string,
    note?: string, processor?: LoggedInUser, notedBy?: LoggedInUser, createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.processor  = processor;
    this.respondant = respondant;
    this.createdAt  = createdAt;
    this.updatedAt  = updatedAt;
    this.deleted    = deleted;
    this.content    = content;
    this.notedBy    = notedBy;
    this.status     = status;
    this.form       = form;
    this.note       = note;
    this._id        = _id;
  }

  getLastMoficationDate(): Date {
    return this.updatedAt!;
  }

  getProcessor(): LoggedInUser {
    return this.processor!;
  }

  getNoter(): LoggedInUser {
    return this.notedBy!;
  }

  getNote(): string {
    return this.note!;
  }

  isDeleted(): Boolean {
    return this.deleted;
  }

  getRespondant(): User {
    return this.respondant;
  }

  getCreationDate(): Date {
    return this.createdAt!;
  }

  getContent(): string {
    return this.content;
  }

  getStatus(): string {
    return this.status;
  }

  getForm(): Form {
    return this.form;
  }

  getId(): string {
    return this._id!;
  }
}
