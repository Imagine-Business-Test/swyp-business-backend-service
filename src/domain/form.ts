import { User } from "../contracts/domain";
import { Response } from "./response";

type Modifier = { email: string, name: string };

export class Form {
  workStation: string;
  lastUpdateBy: Modifier;
  deleted?: Boolean;
  content: string;
  updatedAt?: Date;
  createAt?: Date;
  name: string;
  _id?: string;
  constructor(
    name: string, workStation: string, content: string, modifier: Modifier,
    updatedAt?: Date, createAt?: Date, _id?: string, deleted?: Boolean
  ) {
    this.workStation = workStation;
    this.updatedAt = updatedAt;
    this.createAt = createAt;
    this.lastUpdateBy = modifier;
    this.content = content;
    this.deleted = deleted;
    this.name = name;
  }

  delete(): void {
    this.deleted = true;
  }

  createResponse(user: User, content: string): Response {
    return new Response(user, content, <string>this._id);
  }
}
