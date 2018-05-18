import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  workStation: { type: mongoose.Types.ObjectId, required: true },
  createdAt: { type: Date, required: true },
  content: { type: String, required: true },
  user: {
    email: { type: String, email: true },
    name: { type: String, required: true }
  },
  lastUpdateBy: {
    email: { type: String, email: true },
    name: { type: String }
  },
  updatedAt: { type: Date },
  deleted: { type: Boolean, default: false },
  name: { type: String, required: true }
});

Schema.pre("update", function(next) {
  this.update({}, {$set: { updatedAt: new Date() } });
  next();
});

export const FormModel = mongoose.model("forms", Schema);
