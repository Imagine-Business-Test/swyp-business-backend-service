import { IBusiness, IWorkspace, Ielement } from "../domain";
import mongoose from "mongoose";

export type FormInterface = mongoose.Document & {
  lastModifier: { email: string; name: string };
  creator: { email: string; name: string };
  business: IBusiness;
  workspace: IWorkspace;
  deleted: boolean;
  elements: [Ielement];
  createdAt: Date;
  status: string;
  updateAt: Date;
  name: string;
  slug: string;
  _id: string;
};

export type FormModel = mongoose.Model<FormInterface>;
