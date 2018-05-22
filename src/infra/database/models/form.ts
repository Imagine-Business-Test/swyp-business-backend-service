import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  workStation: { type: mongoose.Types.ObjectId, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  deleted: { type: Boolean, default: false },
  content: { type: String, required: true },
  createdBy: {
    email: { type: String, email: true },
    name: { type: String, required: true }
  },
  lastUpdateBy: {
    email: { type: String, email: true },
    name: { type: String, required: true }
  },
  name: { type: String, required: true }
});


Schema.pre("update", function update(next) {
  this.update({}, {$set: { updatedAt: new Date() } });
  next();
});

export const FormModel = mongoose.model("forms", Schema);
