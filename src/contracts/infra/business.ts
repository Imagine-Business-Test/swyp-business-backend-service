import mongoose from "mongoose";

import { Account } from "../domain";

export type BusinessInterface = mongoose.Document & {
  accounts: Account[];
  logoUrl: string;
  name: string;
};

export type BusinessModel = mongoose.Model<BusinessInterface>;

