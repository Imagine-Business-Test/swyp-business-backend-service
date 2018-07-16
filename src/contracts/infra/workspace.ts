import mongoose from "mongoose";
import { IBusiness } from "../domain";

export type WorkspaceInterface = mongoose.Document & {
  lastModifier: { email: string; name: string };
  creator: { email: string; name: string };
  business: IBusiness;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  name: string;
  _id: string;
};

export type WorkspaceModel = mongoose.Model<WorkspaceInterface>;
