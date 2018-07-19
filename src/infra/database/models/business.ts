import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  accounts: [
    {
      created: { type: Date, default: new Date() },
      deleted: { type: Boolean, default: false },
      deletedBy: { email: String, name: String },
      email: { type: String, required: true, email: true },
      lastLogIn: { type: Date, default: new Date() },
      name: { type: String, required: true },
      password: { type: String, min: 8 },
      passwordResetExpires: { type: Date },
      passwordResetToken: { type: String },
      phone: { type: String, required: true },
      role: { type: String, required: true, enum: ["admin", "worker"] },
      updatedAt: { type: Date, default: new Date() }
    }
  ],
  logoUrl: { type: String, required: true },
  name: { type: String, required: true, unique: true }
});

export const BusinessModel = mongoose.model("businesses", Schema);
