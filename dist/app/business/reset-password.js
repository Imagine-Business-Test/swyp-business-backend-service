"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
const bcrypt_1 = __importDefault(require("bcrypt"));
class ResetPassword extends operation_1.Operation {
    constructor(businessRepository, mailer) {
        super();
        this.businessRepository = businessRepository;
        this.mailer = mailer;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
            const { email, token, password } = command;
            try {
                const business = yield this.businessRepository.findByPasswordResetToken(email, token);
                const user = business.getUser();
                const hasdPassword = yield bcrypt_1.default.hash(password, 10);
                yield this.businessRepository.updatePassword(user.email, hasdPassword);
                this.mailer.sendPasswordChanged(user.name, user.email);
                this.emit(SUCCESS, { updated: true });
            }
            catch (ex) {
                if (ex.message === "DatabaseError") {
                    this.emit(DATABASE_ERROR, ex);
                }
                this.emit(ERROR, ex);
            }
        });
    }
}
exports.ResetPassword = ResetPassword;
ResetPassword.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
//# sourceMappingURL=reset-password.js.map