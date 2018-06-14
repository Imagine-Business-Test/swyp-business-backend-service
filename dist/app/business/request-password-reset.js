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
const v4_1 = __importDefault(require("uuid/v4"));
class RequestPasswordReset extends operation_1.Operation {
    constructor(businessRepository, mailer) {
        super();
        this.businessRepository = businessRepository;
        this.mailer = mailer;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
            try {
                const token = v4_1.default();
                const expires = new Date();
                expires.setHours(2);
                yield this.businessRepository.requestPasswordReset(command.email, token, expires);
                const business = yield this.businessRepository.findByAccountEmail(command.email);
                const user = business.getUser();
                const link = command.origin + `?token=${token}`;
                this.mailer.sendPasswordRequest(user.name, user.email, link);
                this.emit(SUCCESS, { message: "check your mail for a reset password link " });
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
exports.RequestPasswordReset = RequestPasswordReset;
RequestPasswordReset.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
//# sourceMappingURL=request-password-reset.js.map