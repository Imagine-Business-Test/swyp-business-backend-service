"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    form: {
        workspace: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
        id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
        business: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
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
        id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
        email: { type: String, email: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        middlename: { type: String },
        phone: { type: String }
    },
    processors: {
        initiator: {
            email: { type: String, email: true },
            dateOfApproval: Date,
            signatureUrl: String,
            name: String,
            role: String
        },
        approver: {
            email: { type: String, email: true },
            dateOfApproval: Date,
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
exports.ResponseModel = mongoose_1.default.model("responses", Schema);
//# sourceMappingURL=response.js.map