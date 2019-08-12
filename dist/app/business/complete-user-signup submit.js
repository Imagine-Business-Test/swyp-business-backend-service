"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
class CompleteUserSignupSubmit extends operation_1.Operation {
    constructor(businessRepository) {
        super();
        this.businessRepository = businessRepository;
    }
    isTokenValid(tokenDate) {
        return (new Date > tokenDate) ? false : true;
    }
    execute(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR, DATABASE_ERROR, AUTHENTICATION_ERROR, INCOMPLETE_SETUP } = this.outputs;
            try {
                const business = yield this.businessRepository.findByPasswordResetToken(token);
                const user = business.getUser();
                const tokenValid = this.isTokenValid(user.passwordResetExpires);
                return this.emit(SUCCESS, { user, token, tokenValid });
                if (!user.password) {
                    throw new Error("IncompleteSetup");
                }
                return this.emit(SUCCESS, { user, token, business });
            }
            catch (ex) {
                if (ex.message === "DatabaseError") {
                    return this.emit(DATABASE_ERROR, ex);
                }
                if (ex.message === "AuthenticationError") {
                    return this.emit(AUTHENTICATION_ERROR, ex);
                }
                if (ex.message === "IncompleteSetup") {
                    return this.emit(INCOMPLETE_SETUP, ex);
                }
                return this.emit(ERROR, ex);
            }
        });
    }
}
exports.CompleteUserSignupSubmit = CompleteUserSignupSubmit;
CompleteUserSignupSubmit.setOutputs([
    "SUCCESS",
    "ERROR",
    "DATABASE_ERROR",
    "AUTHENTICATION_ERROR",
    "INCOMPLETE_SETUP"
]);
//# sourceMappingURL=complete-user-signup submit.js.map