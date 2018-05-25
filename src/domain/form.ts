import { User } from "../contracts/domain";
import { Response } from "./response";
import { LoggedInUser } from "../contracts/interfaces";


export class Form {
  lastUpdateBy: LoggedInUser;
  createdBy: LoggedInUser;
  workStation: string;
  updatedAt?: Date;
  deleted: Boolean;
  content: string;
  createAt?: Date;
  status: string;
  name: string;
  _id?: string;
  constructor(
    name: string, workStation: string, content: string, status: string,
    createdBy: LoggedInUser, modifier: LoggedInUser, deleted: Boolean,
    updatedAt?: Date, createAt?: Date, _id?: string,
  ) {
    this.workStation  = workStation;
    this.lastUpdateBy = modifier;
    this.createdBy    = createdBy;
    this.updatedAt    = updatedAt;
    this.createAt     = createAt;
    this.content      = content;
    this.deleted      = deleted;
    this.status       = status;
    this.name         = name;
  }

  createResponse(content: string, respondant: User): Response {
    const deleted = false;
    const status = "pending";
    return new Response(respondant, <string>this._id, content, status, deleted);
  }
}
