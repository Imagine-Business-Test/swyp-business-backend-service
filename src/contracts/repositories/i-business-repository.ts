import { ILoggedInUser } from "../interfaces";
import { Business } from "../../domain";
import { IAccount } from "../domain";
import { IBranch } from "../infra";

export interface IBusinessRepository {
  updateDetails: (
    businessId: string,
    logoUrl: string,
    description: string
  ) => void;
  requestPasswordReset: (email: string, token: string, expires: Date) => void;
  addAccount: (business: string, account: IAccount) => Promise<Business>;
  addBranch: (business: string, branch: IBranch) => Promise<Business>;
  deleteAccount: (email: string, modifier: ILoggedInUser) => void;
  deleteBranch: (name: string, modifier: ILoggedInUser) => void;
  findByPasswordResetToken: (token: string) => Promise<Business>;
  updatePassword: (email: string, password: string) => void;
  updateUser: (userId: string, otherInfo: object) => void;
  findByAccountEmail: (email: string) => Promise<Business>;
  add: (business: Business) => Promise<Business>;
  fetchAll: () => void;
}
