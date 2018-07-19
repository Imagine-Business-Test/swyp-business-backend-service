import { Business } from "../../domain";
import { IAccount } from "../domain";
import { ILoggedInUser } from "../interfaces";

export interface IBusinessRepository {
  requestPasswordReset: (email: string, token: string, expires: Date) => void;
  addAccount: (business: string, account: IAccount) => Promise<Business>;
  updatePassword: (email: string, password: string) => void;
  findByAccountEmail: (email: string) => Promise<Business>;
  fetchAll: () => void;
  add: (business: Business) => Promise<Business>;
  deleteAccount: (email: string, modifier: ILoggedInUser) => void;
  findByPasswordResetToken: (email: string, token: string) => Promise<Business>;
}
