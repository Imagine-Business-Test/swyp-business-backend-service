import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, required: true },
  accounts: [{
    email: { type: String, required: true, email: true, unique: true },
    password: { type: String, required: true, min: 8 },
    created: { type: Date, default: Date() },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    passwordResetExpires: { type: Date },
    passwordResetToken: { type: String},
    lastLogIn: { type: Date }
  }]
});

Schema.pre("find", function(next) {
  (this as any).lastLogIn = Date.now();
  next();
});

export const BusinessModel = mongoose.model("businesses", Schema);
