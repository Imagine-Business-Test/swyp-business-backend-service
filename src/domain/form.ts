import { IBusiness, IUser } from "../contracts/domain";
import { ILoggedInUser } from "../contracts/interfaces";
import { Response } from "./response";

export class Form {
  private lastModifier: ILoggedInUser;
  private creator: ILoggedInUser;
  private workstation: string;
  private business: IBusiness;
  private updatedAt?: Date;
  private deleted: boolean;
  private content: string;
  private createdAt?: Date;
  private status: string;
  private name: string;
  private id?: string;

  constructor(
    name: string,
    workstation: string,
    business: IBusiness,
    content: string,
    status: string,
    createdBy: ILoggedInUser,
    modifier: ILoggedInUser,
    deleted: boolean,
    id?: string,
    updatedAt?: Date,
    createdAt?: Date
  ) {
    this.workstation = workstation;
    this.creator = createdBy;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
    this.business = business;
    this.lastModifier = modifier;
    this.content = content;
    this.deleted = deleted;
    this.status = status;
    this.name = name;
    this.id = id;
  }

  public createResponse(content: string, respondant: IUser): Response {
    const deleted = false;
    const status = "pending";
    const business: IBusiness = this.getBusiness();
    const form = {
      id: this.getId(),
      name: this.getName(),
      business: business.id,
      workspace: this.getWorkspace()
    };
    return new Response(respondant, form, content, status, deleted);
  }

  public getLastModifier(): ILoggedInUser {
    return this.lastModifier;
  }

  public getCreationDate(): Date {
    return this.createdAt!;
  }

  public getLastUpdateDate(): Date {
    return this.updatedAt!;
  }

  public getCreator(): ILoggedInUser {
    return this.creator;
  }

  public getWorkspace(): string {
    return this.workstation;
  }

  public isDeleted(): boolean {
    return this.deleted;
  }

  public getContent(): string {
    return this.content;
  }

  public getBusiness(): IBusiness {
    return this.business;
  }

  public getStatus(): string {
    return this.status;
  }

  public getId(): string {
    return this.id!;
  }

  public getName(): string {
    return this.name;
  }
}
