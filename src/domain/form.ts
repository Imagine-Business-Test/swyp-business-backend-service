import { User } from "../contracts/domain";
import { Response } from "./response";

type Modifier = { email: string, name: string };

export class Form {
  workStation: string;
  lastUpdateBy: Modifier;
  createdBy: Modifier;
  deleted: Boolean;
  content: string;
  updatedAt?: Date;
  createAt?: Date;
  name: string;
  _id?: string;
  constructor(
    name: string, workStation: string, content: string, createdBy: Modifier,
    modifier: Modifier, deleted: Boolean, updatedAt?: Date, createAt?: Date,
    _id?: string,
  ) {
    this.workStation  = workStation;
    this.lastUpdateBy = modifier;
    this.createdBy    = createdBy;
    this.updatedAt    = updatedAt;
    this.createAt     = createAt;
    this.content      = content;
    this.deleted      = deleted;
    this.name         = name;
  }

  delete(currentUser: Modifier): void {
    this.lastUpdateBy = currentUser;
    this.deleted = true;
  }

  createResponse(respondant: User, content: string, status: string, deleted: Boolean): Response {
    return new Response(respondant, <string>this._id, content, status, deleted);
  }
}
