"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    parent: {
        type: String,
        enum: ["individual", "corprate"]
    },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: new Date() },
    creator: {
        email: { type: String, email: true, required: true },
        name: { type: String, required: true }
    },
    lastModifier: {
        email: { type: String, email: true, required: true },
        name: { type: String, required: true }
    },
    deleted: { type: Boolean, default: false }
});
Schema.pre("update", function update(next) {
    this.update({}, { $set: { updatedAt: new Date() } });
    next();
});
exports.WorkspaceModel = mongoose_1.default.model("Workspaces", Schema);
//# sourceMappingURL=workspace.js.map