import { BusinessModel } from "../infra";
import { Business } from "../../domain";
import { Account } from "../domain";

export interface BusinessRepositoryInterface {
 model: BusinessModel;

 add: (business: Business) => Promise<Business>;
 addAccount: (businessId: string, account: Account) => Promise<Business>;
 findByAccountEmail: (email: string) => Promise<Business>;
}
