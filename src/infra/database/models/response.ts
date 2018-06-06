import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  form: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, required: true },
  content: { type: String, required: true },
  respondant: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    email: { type: String, email: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middlename: { type: String},
  },
  updatedAt: { type: Date, required: true },
  deleted: { type: Boolean, default: false },
  status: { type: String, enum: ["pending", "processed"], default: "pending" }
});

Schema.pre("update", function(next) {
  this.update({}, {$set: { updatedAt: new Date() } });
  next();
});

export const ResponseModel = mongoose.model("responses", Schema);
