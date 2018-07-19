import { IAccount } from "../contracts/domain";
import { Workspace } from "./workspace";

export class Business {
  private currentUser?: IAccount;
  private accounts: IAccount[];
  private approved: boolean;
  private deleted: boolean;
  private logoUrl?: string;
  private name: string;
  private slug: string;
  private id?: string;

  constructor(
    name: string,
    slug: string,
    approved: boolean,
    deleted: boolean,
    accounts: IAccount[],
    logoUrl?: string,
    id?: string
  ) {
    this.accounts = accounts;
    this.approved = approved;
    this.deleted = deleted;
    this.logoUrl = logoUrl;
    this.slug = slug;
    this.name = name;
    this.id = id;
  }

  public createWorkspace(name: string): Workspace {
    const loggedinUser = {
      email: this.currentUser!.email as string,
      name: this.currentUser!.name as string
    };

    const business = {
      id: this.getId(),
      name: this.getSlug()
    };
    const deleted = false;
    return new Workspace(name, business, loggedinUser, loggedinUser, deleted);
  }

  public setUser(user: IAccount): boolean {
    for (const entry of this.accounts as IAccount[]) {
      if (entry.email === user.email) {
        this.currentUser = user;
        break;
      }
    }
    if (!this.currentUser) {
      throw new Error(`${user.name} does not belong to ${this.name}`);
    }

    return true;
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
