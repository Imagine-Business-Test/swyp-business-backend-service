import mongoose from "mongoose";
import { User } from "../domain";

export type ResponseInterface = mongoose.Document & {
  deleted: Boolean;
  respondant: User;
  updatedAt?: Date;
  createdAt?: Date;
  content: string;
  status: string;
  form: string;
  _id: string;
};

export type ResponseModel = mongoose.Model<ResponseInterface>;
