import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  workStation: { type: mongoose.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now() },
  content: { type: String, required: true },
  user: {
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true }
  },
  updatedAt: { type: Date },
  deleted: { type: Boolean, default: false },
  name: { type: String, required: true }
});

Schema.pre("update", function(next) {
  this.update({}, {$set: { updatedAt: Date.now() } });
  next();
});

export const FormModel = mongoose.model("forms", Schema);
