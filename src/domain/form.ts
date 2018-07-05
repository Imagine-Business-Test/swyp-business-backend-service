import { LoggedInUser } from "../contracts/interfaces";
import { User } from "../contracts/domain";
import { Response } from "./response";

export class Form {
  private lastModifier: LoggedInUser;
  private creator: LoggedInUser;
  private workstation: string;
  private business: string;
  private updatedAt?: Date;
  private deleted: Boolean;
  private content: string;
  private createdAt?: Date;
  private status: string;
  private name: string;
  private _id?: string;


  constructor(
    name: string, workstation: string, business: string, content: string, status: string,
    createdBy: LoggedInUser, modifier: LoggedInUser, deleted: Boolean,
    _id?: string, updatedAt?: Date, createdAt?: Date,
  ) {
    this.workstation  = workstation;
    this.creator      = createdBy;
    this.updatedAt    = updatedAt;
    this.createdAt    = createdAt;
    this.business     = business;
    this.lastModifier = modifier;
    this.content      = content;
    this.deleted      = deleted;
    this.status       = status;
    this.name         = name;
    this._id          = _id;
  }

  createResponse(content: string, respondant: User): Response {
    const deleted = false;
    const status = "pending";
    const form = {
      _id: this.getId(),
      name: this.getName(),
      business: this.getBusiness(),
      workspace: this.getWorkspace()
    };
    return new Response(respondant, form, content, status, deleted);
  }

  getLastModifier(): LoggedInUser {
    return this.lastModifier;
  }

  getCreationDate(): Date {
    return this.createdAt!;
  }

  getLastUpdateDate(): Date {
    return this.updatedAt!;
  }

  getCreator(): LoggedInUser {
    return this.creator;
  }

  getWorkspace(): string {
    return this.workstation;
  }

  isDeleted(): Boolean {
    return this.deleted;
  }

  getContent(): string {
    return this.content;
  }

  getBusiness(): string {
    return this.business;
  }

  getStatus(): string {
    return this.status;
  }

  getId(): string {
    return this._id!;
  }

  getName(): string {
    return this.name;
  }
}
