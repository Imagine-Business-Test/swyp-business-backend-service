import mongoose from "mongoose";
import { IBusiness } from "../domain";

export type FormInterface = mongoose.Document & {
  workspace: string;
  lastModifier: { email: string; name: string };
  creator: { email: string; name: string };
  deleted: boolean;
  business: IBusiness;
  content: string;
  updateAt: Date;
  createdAt: Date;
  status: string;
  name: string;
  _id: string;
};

export type FormModel = mongoose.Model<FormInterface>;
