import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  form: {
    workspace: { type: mongoose.Schema.Types.ObjectId, required: true },
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    business: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true }
  },
  createdAt: { type: Date, required: true, default: new Date() },
  content: String,
  note: String,
  respondant: {
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    email: { type: String, email: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middlename: { type: String },
    phone: { type: String, required: true }
  },

  processor: {
    email: { type: String, email: true },
    name: String
  },

  notedBy: {
    email: { type: String, email: true },
    name: String
  },
  updatedAt: { type: Date, required: true, default: new Date() },
  deleted: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "processed", "noted"],
    default: "pending"
  }
});

Schema.pre("update", function(next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  next();
});

export const ResponseModel = mongoose.model("responses", Schema);
