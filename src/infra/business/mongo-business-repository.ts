import { BusinessModel, IBusinessInterface } from "../../contracts/infra";
import { IBusinessRepository } from "../../contracts/repositories";
import { MongoBusinessMapper } from "./mongo-business-mapper";
import { ILoggedInUser } from "../../contracts/interfaces";
import { IAccount } from "../../contracts/domain";
import { Business } from "../../domain";
import mongoose from "mongoose";

export class MongoBusinessRepository implements IBusinessRepository {
  private model: BusinessModel;

  constructor(businessModel: BusinessModel) {
    this.model = businessModel;
  }

  public async findByPasswordResetToken(token: string): Promise<Business> {
    const doc = await this.fetchOne({
      "accounts.passwordResetToken": token
    });

    const currentUser = this.processCurrentUser(doc.accounts, "", token);

    return MongoBusinessMapper.toEntity(doc, currentUser);
  }

  public async findByAccountEmail(email: string): Promise<Business> {
    const doc = await this.fetchOne({
      "accounts.email": email,
      "accounts.deleted": false
    });

    const currentUser = this.processCurrentUser(doc.accounts, email);
    await this.updateLastLogin(currentUser);
    return MongoBusinessMapper.toEntity(doc, currentUser);
  }

  public async deleteAccount(email: string, modifer: ILoggedInUser) {
    await this.accountRelatedUpdate(
      {
        $set: {
          "accounts.$[element].deleted": true,
          "accounts.$[element].deletedBy": modifer
        }
      },
      { arrayFilters: [{ "element.email": email, "element.deleted": false }] }
    );
  }

  public async add(business: Business): Promise<Business> {
    try {
      const data = MongoBusinessMapper.toDatabase(business);
      const doc: IBusinessInterface = await this.model.create(data);
      return MongoBusinessMapper.toEntity(doc, doc.accounts[0]);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public async updateBranch(userId: string, newBranch: string) {
    await this.accountRelatedUpdate(
      {
        $set: {
          "accounts.$[element].branch": newBranch
        }
      },
      {
        arrayFilters: [{ "element._id": mongoose.Types.ObjectId(userId) }]
      }
    );
  }

  public async updatePassword(email: string, password: string) {
    await this.accountRelatedUpdate(
      {
        $set: {
          "accounts.$[element].password": password,
          "accounts.$[element].passwordResetExpires": null,
          "accounts.$[element].passwordResetToken": null
        }
      },
      { arrayFilters: [{ "element.email": email, "element.deleted": false }] }
    );
  }

  public async requestPasswordReset(
    email: string,
    token: string,
    expires: Date
  ) {
    await this.accountRelatedUpdate(
      {
        $set: {
          "accounts.$[element].passwordResetExpires": expires,
          "accounts.$[element].passwordResetToken": token
        }
      },
      { arrayFilters: [{ "element.email": email, "element.deleted": false }] }
    );
  }

  public async addAccount(
    businessId: string,
    account: IAccount
  ): Promise<Business> {
    try {
      let doc = await this.model.findOne({
        "accounts.email": account.email,
        "accounts.deleted": false
      });
      if (doc && doc.deleted) {
        throw new Error(`Account with the provided email already exist`);
      }

      doc = await this.model.findByIdAndUpdate(
        businessId,
        {
          $addToSet: { accounts: account }
        },
        { new: true }
      );

      if (!doc) {
        throw new Error(`Account not found`);
      }
      return MongoBusinessMapper.toEntity(doc, account);
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  public fetchAll() {
    return this.model.find({});
  }

  private async updateLastLogin(user: IAccount) {
    return this.accountRelatedUpdate(
      { $set: { "accounts.$[element].lastLogIn": new Date() } },
      {
        arrayFilters: [
          { "element.email": user.email, "element.deleted": false }
        ]
      }
    );
  }

  private async fetchOne(condition: {
    [key: string]: any;
  }): Promise<IBusinessInterface> {
    try {
      const doc = await this.model.findOne(condition);
      if (!doc) {
        throw new Error(`Account not found`);
      }
      return doc;
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  private async accountRelatedUpdate(
    update: { [key: string]: { [key: string]: any } },
    arrayCondition: { [key: string]: any }
  ) {
    try {
      const result = await this.model.updateOne({}, update, arrayCondition);
      if (result.nModified !== 1 || result.nMatched === 1) {
        throw new Error("Update operation failed");
      }
    } catch (ex) {
      ex.details = ex.message;
      ex.message = "DatabaseError";
      throw ex;
    }
  }

  private processCurrentUser(
    users: IAccount[],
    email: string,
    token?: string
  ): IAccount {
    // Current user can either be identified by reset password token or an account email
    let currentUser;
    if (token) {
      currentUser = users.find(
        user => user.passwordResetToken === token && user.deleted === false
      ) as IAccount;
    } else {
      currentUser = users.find(
        user => user.email === email && user.deleted === false
      ) as IAccount;
    }

    if (!currentUser) {
      throw new Error("Account disabled");
    }
    return currentUser;
  }
}
