import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  parent: {
    type: String,
    enum: ["individual", "corprate"]
  },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: new Date() },
  creator: {
    email: { type: String, email: true, required: true },
    name: { type: String, required: true }
  },
  lastModifier: {
    email: { type: String, email: true, required: true },
    name: { type: String, required: true }
  },
  deleted: { type: Boolean, default: false }
});

Schema.pre("update", function update(next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  next();
});

export const WorkspaceModel = mongoose.model("Workspaces", Schema);
