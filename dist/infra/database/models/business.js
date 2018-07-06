"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
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
            role: { type: String, required: true },
            updatedAt: { type: Date, default: new Date() }
        }
    ],
    logoUrl: { type: String, required: true },
    name: { type: String, required: true, unique: true }
});
exports.BusinessModel = mongoose_1.default.model("businesses", Schema);
//# sourceMappingURL=business.js.map