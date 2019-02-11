import { ILoggedInUser } from "../interfaces";
import mongoose from "mongoose";

export type WorkspaceInterface = mongoose.Document & {
  lastModifier: ILoggedInUser;
  creator: ILoggedInUser;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  parent: string;
  name: string;
  _id: string;
};

export type WorkspaceModel = mongoose.Model<WorkspaceInterface>;
