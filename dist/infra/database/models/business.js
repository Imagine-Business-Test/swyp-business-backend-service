"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    logoUrl: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    accounts: [{
            email: { type: String, required: true, email: true },
            password: { type: String, required: true, min: 8 },
            created: { type: Date, default: new Date() },
            updatedAt: { type: Date, default: new Date() },
            phone: { type: String, required: true },
            name: { type: String, required: true },
            passwordResetExpires: { type: Date },
            passwordResetToken: { type: String },
            deleted: { type: Boolean, default: false },
            deletedBy: { email: String, name: String },
            lastLogIn: { type: Date, default: new Date() }
        }]
});
exports.BusinessModel = mongoose_1.default.model("businesses", Schema);
//# sourceMappingURL=business.js.map