import mongoose from "mongoose";
import { IBusiness } from "../domain";

export type FormInterface = mongoose.Document & {
  lastModifier: { email: string; name: string };
  creator: { email: string; name: string };
  business: IBusiness;
  elementCount: number;
  workspace: string;
  deleted: boolean;
  content: string;
  createdAt: Date;
  status: string;
  updateAt: Date;
  name: string;
  slug: string;
  _id: string;
};

export type FormModel = mongoose.Model<FormInterface>;
