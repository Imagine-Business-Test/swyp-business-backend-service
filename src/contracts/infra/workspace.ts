import mongoose from "mongoose";

export type WorkspaceInterface = mongoose.Document & {
  lastModifier: { email: string, name: string };
  creator: { email: string, name: string };
  business: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: Boolean;
  name: string;
  _id: string;
};

export type WorkspaceModel = mongoose.Model<WorkspaceInterface>;
