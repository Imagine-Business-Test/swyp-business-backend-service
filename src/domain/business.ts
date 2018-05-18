import { WorkStation } from "./work-station";
type Account = {
  passwordRetToken?: string;
  passwordRetExpires?: Date;
  password: string;
  created: Date;
  phone: string;
  email: string;
  name: string;
};

export class Business {
  currentUser?: Account;
  accounts: Account[];
  name: string;
  logoUrl: string;

  constructor(user: Account, name: string, logoUrl: string) {
    this.accounts = [user];
    this.name = name;
    this.logoUrl = logoUrl;
  }

  setCurrentUser(user: Account): void {

    for (const entry of this.accounts) {
      if (entry.email === user.email) {
        this.currentUser = user;
        break;
      }
    }
    throw new Error(`${user.name} does not belong to ${(this.constructor.name)}`);
  }

  getCurrentUserPassword(): string {
    return this.currentUser!.password;
  }

  createWorkStation(name: string): WorkStation {
    const user = { name: <string>this.currentUser!.name, email: <string>this.currentUser!.email};

    return new WorkStation(name, user);
  }

}
