import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  logoUrl: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  accounts: [{
    email: { type: String, required: true, email: true, unique: true },
    password: { type: String, required: true, min: 8 },
    created: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    passwordResetExpires: { type: Date },
    passwordResetToken: { type: String},
    lastLogIn: { type: Date,  default: new Date() }
  }]
});


export const BusinessModel = mongoose.model("businesses", Schema);
