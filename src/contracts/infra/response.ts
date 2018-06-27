import mongoose from "mongoose";
import { User, Form } from "../domain";
import { LoggedInUser } from "../interfaces";

export type ResponseInterface = mongoose.Document & {
  processor: LoggedInUser,
  notedBy: LoggedInUser,
  deleted: Boolean;
  respondant: User;
  updatedAt: Date;
  createdAt: Date;
  content: string;
  status: string;
  note: string;
  form: Form;
  _id: string;
};

export type ResponseModel = mongoose.Model<ResponseInterface>;
