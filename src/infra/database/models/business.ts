import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  branches: [
    {
      name: { type: String, required: true },
      area: { type: String, required: true },
      state: { type: String, required: true },
      address: { type: String, required: true }
    }
  ],
  accounts: [
    {
      created: { type: Date, default: new Date() },
      deleted: { type: Boolean, default: false },
      deletedBy: { email: String, name: String },
      email: { type: String, required: true, email: true },
      lastLogIn: { type: Date, default: new Date() },
      name: { type: String, required: true },
      branch: { type: String, required: true },
      password: { type: String, min: 8 },
      passwordResetExpires: { type: Date },
      passwordResetToken: { type: String },
      phone: { type: String, required: true },
      role: {
        type: String,
        required: true,
        enum: ["admin", "worker", "manager"]
      },
      updatedAt: { type: Date, default: new Date() }
    }
  ],
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  approved: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  logoUrl: String
});

export const BusinessModel = mongoose.model("businesses", Schema);
