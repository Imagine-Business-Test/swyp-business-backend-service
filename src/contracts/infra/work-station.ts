import mongoose from "mongoose";

export type WorkStationInterface = mongoose.Document & {
  lastUpdatedBy: { email: string, name: string };
  createdBy: { email: string, name: string };
  createdAt: Date;
  updatedAt: Date;
  deleted: Boolean;
  name: string;
  _id: string;
};

export type WorkStationModel = mongoose.Model<WorkStationInterface>;
