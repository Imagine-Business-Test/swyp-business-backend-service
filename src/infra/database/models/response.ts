import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  form: {
    workspace: { type: mongoose.Schema.Types.ObjectId, required: true },
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    business: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true }
  },
  branch: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
  content: [
    {
      questionType: { type: String, required: true },
      questionId: { type: String, required: true },
      question: { type: String, required: true },
      answer: { type: String, required: true }
    }
  ],
  note: String,
  notes: [
    {
      notedBy: {
        email: { type: String, email: true },
        name: String
      },
      note: String,
      date: { type: String, required: true }
    }
  ],
  respondant: {
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    email: { type: String, email: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middlename: { type: String },
    phone: { type: String }
  },
  processors: {
    worker: {
      email: { type: String, email: true },
      signatureUrl: String,
      name: String,
      role: String
    },
    manager: {
      email: { type: String, email: true },
      signatureUrl: String,
      role: String,
      name: String
    }
  },
  updatedAt: { type: Date, required: true, default: new Date() },
  deleted: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "processed", "partiallyprocessed"],
    default: "pending"
  }
});

export const ResponseModel = mongoose.model("responses", Schema);
