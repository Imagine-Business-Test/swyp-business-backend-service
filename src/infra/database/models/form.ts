import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  status: { type: String, enum: ["active", "disabled"], default: "active" },
  workspace: {
    id: { type: String, required: true },
    parent: { type: String, required: true },
    name: { type: String, required: true }
  },
  business: {
    id: { type: String, required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true }
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  deleted: { type: Boolean, default: false },
  elements: { type: Array, required: true },
  creator: {
    email: { type: String, email: true, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true }
  },
  lastModifier: {
    email: { type: String, email: true, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true }
  },
  name: { type: String, required: true },
  slug: { type: String, required: true }
});

Schema.pre("update", function update(next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  next();
});

export const FormModel = mongoose.model("forms", Schema);
