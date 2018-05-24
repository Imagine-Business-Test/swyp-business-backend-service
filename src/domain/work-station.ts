import { Form } from "./form";

type User = { email: string, name: string };

export class WorkStation {
  lastUpdatedBy: User;
  deleted: Boolean;
  business: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: User;
  name: string;
  _id?: string;

  constructor(
    name: string, business: string, createdBy: User, lastUpdatedBy: User,
    deleted: Boolean, _id?: string, createdAt?: Date, updatedAt?: Date
  ) {
    this.lastUpdatedBy = lastUpdatedBy;
    this.createdBy     = createdBy;
    this.business      = business;
    this.deleted       = deleted;
    this.createdAt     = createdAt;
    this.updatedAt     = updatedAt;
    this.name          = name;
    this._id           = _id;
  }

  createForm(name: string, content: string, currentUser: User, deleted: Boolean): Form {
    return new Form(name, <string>this._id, content, currentUser, currentUser, deleted);
  }
}
