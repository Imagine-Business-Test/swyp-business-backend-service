import { LoggedInUser } from "../contracts/interfaces";
import { User } from "../contracts/domain";
import { Response } from "./response";

export class Form {
  private lastModifier: LoggedInUser;
  private creator: LoggedInUser;
  private workstation: string;
  private updatedAt?: Date;
  private deleted: Boolean;
  private content: string;
  private createAt?: Date;
  private status: string;
  private name: string;
  private _id?: string;

  constructor(
    name: string, workstation: string, content: string, status: string,
    createdBy: LoggedInUser, modifier: LoggedInUser, deleted: Boolean,
    _id?: string, updatedAt?: Date, createAt?: Date,
  ) {
    this.workstation  = workstation;
    this.lastModifier = modifier;
    this.creator    = createdBy;
    this.updatedAt    = updatedAt;
    this.createAt     = createAt;
    this.content      = content;
    this.deleted      = deleted;
    this.status       = status;
    this.name         = name;
    this._id          = _id;
  }

  createResponse(content: string, respondant: User): Response {
    const deleted = false;
    const status = "pending";
    return new Response(respondant, <string>this._id, content, status, deleted);
  }

  getLastModifier(): LoggedInUser {
    return this.lastModifier;
  }

  getCreationDate(): Date {
    return this.createAt!;
  }

  getLastUpdateDate(): Date {
    return this.updatedAt!;
  }

  getCreator(): LoggedInUser {
    return this.creator;
  }

  getWorkstationId(): string {
    return this.workstation;
  }

  isDeleted(): Boolean {
    return this.deleted;
  }

  getContent(): string {
    return this.content;
  }

  getStatus(): string {
    return this.status;
  }

  getName(): string {
    return this.name;
  }
}
