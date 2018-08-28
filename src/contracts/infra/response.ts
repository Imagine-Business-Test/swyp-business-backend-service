import mongoose from "mongoose";
import { IForm, IUser } from "../domain";
import { ILoggedInUser } from "../interfaces";
export interface IBranch {
  name: string;
  state: string;
  address: string;
}
export type ResponseInterface = mongoose.Document & {
  processor: ILoggedInUser;
  notedBy: ILoggedInUser;
  branch: IBranch;
  respondant: IUser;
  deleted: boolean;
  updatedAt: Date;
  createdAt: Date;
  content: string;
  status: string;
  notes: [string];
  form: IForm;
  _id: string;
};

export type ResponseModel = mongoose.Model<ResponseInterface>;
