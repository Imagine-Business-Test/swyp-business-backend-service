import { User as FormRespondant } from "../contracts/domain";
import { Response } from "./response";

type User = { email: string, name: string };

export class Form {
  workStation: string;
  lastUpdateBy: User;
  deleted: Boolean;
  content: string;
  updatedAt: Date;
  createAt: Date;
  name: string;
  _id?: string;
  user: User;
  constructor(user: User, name: string, workStation: string, content: string) {
    this.workStation = workStation;
    this.updatedAt = new Date();
    this.createAt = new Date();
    this.lastUpdateBy = user;
    this.content = content;
    this.deleted = false;
    this.name = name;
    this.user = user;
  }

  updateDelete(): void {
    this.deleted = true;
  }

  createResponse(user: FormRespondant, content: string): Response {
    return new Response(user, content, <string>this._id);
  }
}
