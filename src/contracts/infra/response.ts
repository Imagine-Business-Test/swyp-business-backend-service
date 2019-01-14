import { IForm, IUser, IResponseContent, INote } from "../domain";
import { ILoggedInUser } from "../interfaces";
import mongoose from "mongoose";

export type ResponseInterface = mongoose.Document & {
  processor: ILoggedInUser;
  branch: string;
  respondant: IUser;
  deleted: boolean;
  updatedAt: Date;
  createdAt: Date;
  content: [IResponseContent];
  status: string;
  notes: [INote];
  form: IForm;
  _id: string;
};

export type ResponseModel = mongoose.Model<ResponseInterface>;
