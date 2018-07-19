import mongoose from "mongoose";

import { IAccount } from "../domain";

export type IBusinessInterface = mongoose.Document & {
  accounts: IAccount[];
  approved: boolean;
  deleted: boolean;
  logoUrl: string;
  name: string;
  slug: string;
  _id: string;
};

export type BusinessModel = mongoose.Model<IBusinessInterface>;
