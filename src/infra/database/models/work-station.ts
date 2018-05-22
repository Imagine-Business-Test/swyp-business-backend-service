import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: {
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true }
  },
  deleted: { type: Boolean, default: false }
});

export const WorkStationModel = mongoose.model("work-stations", Schema);
