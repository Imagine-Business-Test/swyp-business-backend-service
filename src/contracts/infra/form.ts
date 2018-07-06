import mongoose from "mongoose";

export type FormInterface = mongoose.Document & {
  workspace: string;
  lastModifier: { email: string; name: string };
  creator: { email: string; name: string };
  deleted: boolean;
  business: string;
  content: string;
  updateAt: Date;
  createdAt: Date;
  status: string;
  name: string;
  _id: string;
};

export type FormModel = mongoose.Model<FormInterface>;
