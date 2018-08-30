"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    status: { type: String, enum: ["active", "disabled"], default: "active" },
    workspace: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    business: {
        id: { type: String, required: true },
        name: { type: String, required: true }
    },
    elementCount: { type: Number, required: true },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deleted: { type: Boolean, default: false },
    content: { type: String, required: true },
    creator: {
        email: { type: String, email: true, required: true },
        name: { type: String, required: true }
    },
    lastModifier: {
        email: { type: String, email: true, required: true },
        name: { type: String, required: true }
    },
    name: { type: String, required: true },
    slug: { type: String, required: true }
});
Schema.pre("update", function update(next) {
    this.update({}, { $set: { updatedAt: new Date() } });
    next();
});
exports.FormModel = mongoose_1.default.model("forms", Schema);
//# sourceMappingURL=form.js.map