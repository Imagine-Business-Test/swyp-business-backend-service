import { Business } from "../../domain";
import { IAccount } from "../domain";
import { ILoggedInUser } from "../interfaces";

export interface IBusinessRepository {
  requestPasswordReset: (email: string, token: string, expires: Date) => void;
  addAccount: (business: string, account: IAccount) => Promise<Business>;
  deleteAccount: (email: string, modifier: ILoggedInUser) => void;
  findByPasswordResetToken: (token: string) => Promise<Business>;
  updatePassword: (email: string, password: string) => void;
  updateBranch: (userId: string, newBranch: string) => void;
  findByAccountEmail: (email: string) => Promise<Business>;
  add: (business: Business) => Promise<Business>;
  fetchAll: () => void;
}
