import { Business } from "../../domain";
import { Account } from "../domain";

export interface BusinessRepository {

 add: (business: Business) => Promise<Business>;
 addAccount: (businessId: string, account: Account) => Promise<Business>;
 findByAccountEmail: (email: string) => Promise<Business>;
 deleteAccount: (email: string) => void;
}
