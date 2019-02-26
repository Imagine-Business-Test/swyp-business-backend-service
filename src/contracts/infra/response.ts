import { IForm, IUser, IResponseContent, INote } from "../domain";
import mongoose from "mongoose";

export interface IProcessor {
  name: string;
  role: string;
  email: string;
  dateOfApproval?: Date;
  signatureUrl: string;
}

interface IProcessors {
  manager: IProcessor;
  worker: IProcessor;
}

export type ResponseInterface = mongoose.Document & {
  processors: IProcessors;
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
