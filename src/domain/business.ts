import { IAccount } from "../contracts/domain";
import { IBranch } from "../contracts/infra";

export class Business {
  private currentUser?: IAccount;
  private accounts: IAccount[];
  private branches?: IBranch[];
  private description?: string;
  private approved: boolean;
  private deleted: boolean;
  private logoUrl?: string;
  private name: string;
  private slug: string;
  private id?: string;
  private color: string;

  constructor(
    name: string,
    slug: string,
    approved: boolean,
    deleted: boolean,
    accounts: IAccount[],
    color: string,
    branches?: IBranch[],
    logoUrl?: string,
    description?: string,
    id?: string
  ) {
    this.description = description;
    this.accounts = accounts;
    this.approved = approved;
    this.branches = branches;
    this.deleted = deleted;
    this.logoUrl = logoUrl;
    this.slug = slug;
    this.name = name;
    this.id = id;
    this.color = color;
  }

  public setUser(user: IAccount) {
    for (const entry of this.accounts as IAccount[]) {
      if (entry.email === user.email) {
        this.currentUser = user;
        break;
      }
    }
    if (!this.currentUser) {
      throw new Error(`${user.name} does not belong to ${this.name}`);
    }
  }

  public getDiscription(): string {
    return this.description!;
  }

  public getBranches(): IBranch[] {
    return this.branches!;
  }

  public getId(): string {
    return this.id!;
  }

  public getAccounts(): IAccount[] {
    return this.accounts;
  }

  public getSlug(): string {
    return this.slug;
  }

  public getLogo(): string {
    return this.logoUrl!;
  }

  public getColor(): string {
    return this.color!;
  }

  public getName(): string {
    return this.name;
  }

  public getUser(): IAccount {
    return this.currentUser!;
  }

  public isApproved(): boolean {
    return this.approved;
  }

  public isDeleted(): boolean {
    return this.deleted;
  }
}
