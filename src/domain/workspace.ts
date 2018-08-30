// @ts-ignore
import slug from "slug";
import { IBusiness } from "../contracts/domain";
import { ILoggedInUser } from "../contracts/interfaces";
import { Form } from "./form";

export class Workspace {
  private lastModifier: ILoggedInUser;
  private deleted: boolean;
  private business: IBusiness;
  private createdAt?: Date;
  private updatedAt?: Date;
  private creator: ILoggedInUser;
  private name: string;
  private id?: string;

  constructor(
    name: string,
    business: IBusiness,
    creator: ILoggedInUser,
    lastModifier: ILoggedInUser,
    deleted: boolean,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.lastModifier = lastModifier;
    this.creator = creator;
    this.business = business;
    this.deleted = deleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.id = id;
  }

  public createForm(
    name: string,
    content: string,
    elementCount: number,
    creator: ILoggedInUser
  ): Form {
    const deleted = false;
    const status = "active";
    const sluggedName: string = slug(name);
    return new Form(
      name,
      sluggedName,
      this.getId() as string,
      this.getBusiness(),
      content,
      status,
      elementCount,
      creator,
      creator,
      deleted
    );
  }

  public getCreationDate(): Date {
    return this.createdAt!;
  }

  public getLastUpdateDate(): Date {
    return this.updatedAt!;
  }

  public getLastModifier(): ILoggedInUser {
    return this.lastModifier;
  }

  public getBusiness(): IBusiness {
    return this.business;
  }

  public getCreator(): ILoggedInUser {
    return this.creator;
  }

  public isDeleted(): boolean {
    return this.deleted;
  }

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.id!;
  }
}
