// import { Form } from "./form";

type User = { email: string, name: string };

export class WorkStation {
  deleted: Boolean;
  createdAt: Date;
  name: string;
  user: User;
  _id?: string;

  constructor(name: string, user: User) {
    this.createdAt = new Date();
    this.deleted = false;
    this.user = user;
    this.name = name;
  }

  updateDeleted(): void {
    this.deleted = true;
  }

  // createForm(user: User, name: string, content: string): Form {
  //   return new Form(user, name, <string>this._id, content);
  // }
}
