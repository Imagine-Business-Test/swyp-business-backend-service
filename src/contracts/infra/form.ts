import { IBusiness, IWorkspace, Ielement } from "../domain";
import { ILoggedInUser } from "../interfaces";
import mongoose from "mongoose";

export type FormInterface = mongoose.Document & {
  lastModifier: ILoggedInUser;
  creator: ILoggedInUser;
  workspace: IWorkspace;
  elements: [Ielement];
  business: IBusiness;
  deleted: boolean;
  createdAt: Date;
  updateAt: Date;
  status: string;
  name: string;
  slug: string;
  _id: string;
};

export type FormModel = mongoose.Model<FormInterface>;
