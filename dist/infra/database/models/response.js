"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    form: {
        _id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
        workspace: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
        business: { type: mongoose_1.default.Schema.Types.ObjectId, required: true }
    },
    createdAt: { type: Date, required: true, default: new Date() },
    content: String,
    note: String,
    respondant: {
        _id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
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
    status: { type: String, enum: ["pending", "processed", "noted"], default: "pending" }
});
Schema.pre("update", function (next) {
    this.update({}, { $set: { updatedAt: new Date() } });
    next();
});
exports.ResponseModel = mongoose_1.default.model("responses", Schema);
//# sourceMappingURL=response.js.map