import { Workstation } from "./workstation";
import { Account } from "../contracts/domain";


export class Business {
  currentUser?: Account;
  accounts?: Account[];
  name: string;
  logoUrl: string;
  _id?: string;

  constructor(name: string, logoUrl: string, accounts?: Account[], _id?: string) {

    this.accounts = accounts;
    this.logoUrl  = logoUrl;
    this.name     = name;
    this._id      = _id;
  }

  setCurrentUser(user: Account): void {

    for (const entry of <Account[]>this.accounts) {
      if (entry.email === user.email) {
        this.currentUser = user;
        break;
      }
    }
    throw new Error(`${user.name} does not belong to ${(this.constructor.name)}`);
  }

  getCurrentUser(): Account {
    return this.currentUser!;
  }

  createWorkStation(name: string): Workstation {
    const loggedinUser = {
      name: <string>this.currentUser!.name,
      email: <string>this.currentUser!.email};
    const business = this._id!;
    const deleted = false;
    return new Workstation(name, business, loggedinUser, loggedinUser, deleted);
  }

}
