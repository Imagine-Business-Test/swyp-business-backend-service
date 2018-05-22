import { Form } from "./form";

type User = { email: string, name: string };

export class WorkStation {
  lastUpdatedBy: User;
  deleted?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: User;
  name: string;
  _id?: string;

  constructor(
    name: string, createdBy: User, lastUpdatedBy: User, _id?: string, deleted?: Boolean,
    createdAt?: Date, updatedAt?: Date
  ) {
    this.lastUpdatedBy = lastUpdatedBy;
    this.createdBy     = createdBy;
    this.deleted       = deleted;
    this.createdAt     = createdAt;
    this.updatedAt     = updatedAt;
    this.name          = name;
    this._id           = _id;
  }

  updateDeleted(currentUser: User): void {
    this.lastUpdatedBy = currentUser;
    this.deleted = true;
  }

  createForm(name: string, content: string, currentUser: User): Form {
    return new Form(name, <string>this._id, content, currentUser, currentUser);
  }
}
