import mongoose from "mongoose";

export type WorkspaceInterface = mongoose.Document & {
  lastModifier: { email: string; name: string };
  creator: { email: string; name: string };
  parent: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  name: string;
  _id: string;
};

export type WorkspaceModel = mongoose.Model<WorkspaceInterface>;
