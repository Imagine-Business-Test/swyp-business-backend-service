import mongoose from "mongoose";
import { IForm, IUser } from "../domain";
import { ILoggedInUser } from "../interfaces";

export type ResponseInterface = mongoose.Document & {
  processor: ILoggedInUser;
  notedBy: ILoggedInUser;
  deleted: boolean;
  respondant: IUser;
  updatedAt: Date;
  createdAt: Date;
  content: string;
  status: string;
  note: string;
  form: IForm;
  _id: string;
};

export type ResponseModel = mongoose.Model<ResponseInterface>;
