import { Business } from "../../domain";
import { Account } from "../domain";

export interface BusinessRepository {

 requestPasswordReset: (email: string, token: string, expires: Date) => void;
 addAccount: (businessId: string, account: Account) => Promise<Business>;
 updatePassword: (email: string, password: string) => void;
 findByAccountEmail: (email: string) => Promise<Business>;
 add: (business: Business) => Promise<Business>;
 deleteAccount: (email: string) => void;

}
