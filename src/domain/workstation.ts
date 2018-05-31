import { Form } from "./form";
import { LoggedInUser } from "../contracts/interfaces";


export class Workstation {
  private lastUpdatedBy: LoggedInUser;
  private deleted: Boolean;
  private business: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private createdBy: LoggedInUser;
  private name: string;
  private _id?: string;

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

  getCreationDate(): Date {
    return this.createdAt!;
  }

  getLastUpdateDate(): Date {
    return this.updatedAt!;
  }

  getLastModifier(): LoggedInUser {
    return this.lastUpdatedBy;
  }

  getBusinessId(): string {
    return this.business;
  }

  getCreator(): LoggedInUser {
    return this.createdBy;
  }

  isDeleted(): Boolean {
    return this.deleted;
  }

  getName(): string {
    return this.name;
  }
}
