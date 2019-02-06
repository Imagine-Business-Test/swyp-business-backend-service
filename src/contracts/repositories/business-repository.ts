import { ILoggedInUser } from "../interfaces";
import { Business } from "../../domain";
import { IAccount } from "../domain";

export interface IBusinessRepository {
  updateDetails: (
    businessId: string,
    logoUrl: string,
    description: string
  ) => void;
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
