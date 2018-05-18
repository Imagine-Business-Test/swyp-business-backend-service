import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  form: { type: mongoose.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now() },
  content: { type: String, required: true },
  user: {
    _id: { type: mongoose.Types.ObjectId, required: true },
    email: { type: String, email: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    lastmiddle: { type: String},
  },
  updatedAt: { type: Date },
  deleted: { type: Boolean, default: false },
  name: { type: String, required: true },
  status: { type: String, enum: ["pending", "processed"], default: "pending" }
});

Schema.pre("update", function(next) {
  this.update({}, {$set: { updatedAt: Date.now() } });
  next();
});

export const ResponseModel = mongoose.model("responses", Schema);
