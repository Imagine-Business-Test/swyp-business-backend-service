import mongoose from "mongoose";
// import { ILoggedInUser } from "../interfaces";
import { IAccount } from "../domain";
export interface IBranch {
  area: string;
  name: string;
  state: string;
  address: string;
  stateId: string;
  updatedAt?: Date;
  created?: Date;
  deleted?: boolean;
}
export type IBusinessInterface = mongoose.Document & {
  description: string;
  accounts: IAccount[];
  branches: IBranch[];
  approved: boolean;
  deleted: boolean;
  logoUrl: string;
  name: string;
  slug: string;
  _id: string;
  color: string;
};

export type BusinessModel = mongoose.Model<IBusinessInterface>;
