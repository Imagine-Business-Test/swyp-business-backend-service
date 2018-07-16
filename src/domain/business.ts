import { IAccount } from "../contracts/domain";
import { Workspace } from "./workspace";

export class Business {
  private currentUser?: IAccount;
  private accounts: IAccount[];
  private name: string;
  private logoUrl: string;
  private id?: string;

  constructor(
    name: string,
    logoUrl: string,
    accounts: IAccount[],
    id?: string
  ) {
    this.accounts = accounts;
    this.logoUrl = logoUrl;
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
      name: this.getName()
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

  public getLogo(): string {
    return this.logoUrl;
  }

  public getName(): string {
    return this.name;
  }

  public getUser(): IAccount {
    return this.currentUser!;
  }
}
