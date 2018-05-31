import { User } from "../contracts/domain";

export class Response {
  private deleted: Boolean;
  private respondant: User;
  private updatedAt?: Date;
  private createdAt?: Date;
  private content: string;
  private status: string;
  private form: string;
  private _id?: string;

  constructor(
    respondant: User, form: string, content: string, status: string, deleted: Boolean,
     _id?: string, createdAt?: Date, updatedAt?: Date,
  ) {
    this.respondant = respondant;
    this.createdAt  = createdAt;
    this.updatedAt  = updatedAt;
    this.deleted    = deleted;
    this.content    = content;
    this.status     = status;
    this.form       = form;
    this._id        = _id;
  }

  isDeleted(): Boolean {
    return this.deleted;
  }

  getLastMoficationDate(): Date {
    return this.updatedAt!;
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

  getFormId(): string {
    return this.form;
  }

  getId(): string {
    return this._id!;
  }
}
