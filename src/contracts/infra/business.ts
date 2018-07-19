import mongoose from "mongoose";

import { IAccount } from "../domain";

export type IBusinessInterface = mongoose.Document & {
  accounts: IAccount[];
  logoUrl: string;
  name: string;
  _id: string;
};

export type BusinessModel = mongoose.Model<IBusinessInterface>;
