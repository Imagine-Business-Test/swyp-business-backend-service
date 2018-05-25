import { Form } from "./form";
import { LoggedInUser } from "../contracts/interfaces";


export class WorkStation {
  lastUpdatedBy: LoggedInUser;
  deleted: Boolean;
  business: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: LoggedInUser;
  name: string;
  _id?: string;

  constructor(
    name: string, business: string, createdBy: LoggedInUser, lastUpdatedBy: LoggedInUser,
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

  createForm(name: string, content: string, creator: LoggedInUser): Form {
    const deleted = false, status = "active";
    return new Form(name, <string>this._id, content, status, creator, creator, deleted);
  }
}
