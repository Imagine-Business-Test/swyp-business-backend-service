import { Form } from "./form";

type User = { email: string, name: string };

export class WorkStation {
  deleted: Boolean;
  createdAt: Date;
  name: string;
  createdBy: User;
  _id?: string;

  constructor(name: string, user: User) {
    this.createdAt = new Date();
    this.deleted = false;
    this.createdBy = user;
    this.name = name;
  }

  updateDeleted(): void {
    this.deleted = true;
  }

  createForm(name: string, content: string, currentUser: User): Form {
    return new Form(name, <string>this._id, content, currentUser, currentUser);
  }
}
