import { ILoggedInUser } from "../contracts/interfaces";

export class Workspace {
  private lastModifier: ILoggedInUser;
  private deleted: boolean;
  private parent: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private creator: ILoggedInUser;
  private name: string;
  private id?: string;

  constructor(
    name: string,
    parent: string,
    creator: ILoggedInUser,
    lastModifier: ILoggedInUser,
    deleted: boolean,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.lastModifier = lastModifier;
    this.creator = creator;
    this.parent = parent;
    this.deleted = deleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.id = id;
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

  public getParent(): string {
    return this.parent;
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
