import { User } from "../contracts/domain";

export class Response {
  deleted: Boolean;
  updatedAt: Date;
  createdAt: Date;
  content: string;
  status: string;
  form: string;
  _id?: string;
  user: User;

  constructor(user: User, content: string, form: string) {
    this.updatedAt = new Date();
    this.createdAt = new Date();
    this.status = "pending";
    this.content = content;
    this.deleted = false;
    this.form = form;
    this.user = user;
  }
}
