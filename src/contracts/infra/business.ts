import mongoose from "mongoose";
import { Account } from "../domain";

export type Business = mongoose.Document & {
  accounts: Account[];
  logoUrl: string;
  name: string;
};

