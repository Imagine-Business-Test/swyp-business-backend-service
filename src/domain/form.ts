import { IBusiness, IUser } from "../contracts/domain";
import { ILoggedInUser } from "../contracts/interfaces";
import { Response } from "./response";

export class Form {
  private lastModifier: ILoggedInUser;
  private creator: ILoggedInUser;
  private elementCount: number;
  private workstation: string;
  private business: IBusiness;
  private updatedAt?: Date;
  private createdAt?: Date;
  private deleted: boolean;
  private content: string;
  private status: string;
  private name: string;
  private slug: string;
  private id?: string;

  // changing order of parameter is disruptive
  constructor(
    name: string,
    slug: string,
    workstation: string,
    business: IBusiness,
    content: string,
    status: string,
    elementCount: number,
    createdBy: ILoggedInUser,
    modifier: ILoggedInUser,
    deleted: boolean,
    id?: string,
    updatedAt?: Date,
    createdAt?: Date
  ) {
    this.elementCount = elementCount;
    this.workstation = workstation;
    this.lastModifier = modifier;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
    this.creator = createdBy;
    this.business = business;
    this.content = content;
    this.deleted = deleted;
    this.status = status;
    this.name = name;
    this.id = id;
    this.slug = slug;
  }

  public createResponse(
    content: any,
    respondant: IUser,
    branch: string
  ): Response {
    const deleted = false;
    const status = "pending";
    const business: IBusiness = this.getBusiness();
    const form = {
      id: this.getId(),
      name: this.getName(),
      business: business.id,
      workspace: this.getWorkspace()
    };
    return new Response(respondant, branch, form, content, status, deleted);
  }

  public getElementCount(): number {
    return this.elementCount;
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

  public getSlug(): string {
    return this.slug;
  }
}
