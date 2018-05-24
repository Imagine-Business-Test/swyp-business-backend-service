import { User } from "../contracts/domain";
import { Response } from "./response";

type Modifier = { email: string, name: string };

export class Form {
  lastUpdateBy: Modifier;
  createdBy: Modifier;
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
    createdBy: Modifier, modifier: Modifier, deleted: Boolean,
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

  delete(currentUser: Modifier): void {
    this.lastUpdateBy = currentUser;
    this.deleted = true;
  }

  createResponse(respondant: User, content: string, status: string, deleted: Boolean): Response {
    return new Response(respondant, <string>this._id, content, status, deleted);
  }
}
