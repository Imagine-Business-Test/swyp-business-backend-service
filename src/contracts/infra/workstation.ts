import mongoose from "mongoose";

export type WorkstationInterface = mongoose.Document & {
  lastUpdatedBy: { email: string, name: string };
  createdBy: { email: string, name: string };
  business: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: Boolean;
  name: string;
  _id: string;
};

export type WorkstationModel = mongoose.Model<WorkstationInterface>;
