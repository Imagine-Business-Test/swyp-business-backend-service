import { Workstation } from "./workstation";
import { Account } from "../contracts/domain";


export class Business {
  private currentUser?: Account;
  private accounts: Account[];
  private name: string;
  logoUrl: string;
  private _id?: string;

  constructor(name: string, logoUrl: string, accounts: Account[], _id?: string) {

    this.accounts = accounts;
    this.logoUrl  = logoUrl;
    this.name     = name;
    this._id      = _id;
  }
  createWorkStation(name: string): Workstation {

    const loggedinUser = {
      name: <string>this.currentUser!.name,
      email: <string>this.currentUser!.email
    };

    const business = this._id!;
    const deleted = false;
    return new Workstation(name, business, loggedinUser, loggedinUser, deleted);
  }

  setUser(user: Account): Boolean {

    for (const entry of <Account[]>this.accounts) {
      if (entry.email === user.email) {
        this.currentUser = user;
        break;
      }
    }
    if (!this.currentUser)
      throw new Error(`${user.name} does not belong to ${(this.name)}`);

    return true;
  }

  getId() {
    return this._id;
  }

  getAccounts() {
    return this.accounts;
  }

  getLogo() {
    return this.logoUrl;
  }

  getName() {
    return this.name;
  }

  getUser(): Account {

    return this.currentUser!;
  }
}
