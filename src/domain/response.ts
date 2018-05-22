import { User } from "../contracts/domain";

export class Response {
  deleted: Boolean;
  respondant: User;
  updatedAt?: Date;
  createdAt?: Date;
  content: string;
  status: string;
  form: string;
  _id?: string;

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
}
