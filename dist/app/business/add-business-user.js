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
class AddBusinessUser extends operation_1.Operation {
    constructor(businessRepository, mailer) {
        super();
        this.businessRepository = businessRepository;
        this.mailer = mailer;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
            try {
                const { businessId, account } = command;
                const urlToken = v4_1.default();
                account.passwordResetToken = urlToken;
                const business = yield this.businessRepository.addAccount(businessId, account);
                const user = business.getUser();
                const link = command.origin + `/${urlToken}`;
                this.mailer.welcome(user.name, command.user.name, user.email, link);
                return this.emit(SUCCESS, { business });
            }
            catch (ex) {
                if (ex.message === "DatabaseError") {
                    return this.emit(DATABASE_ERROR, ex);
                }
                return this.emit(ERROR, ex);
            }
        });
    }
}
exports.AddBusinessUser = AddBusinessUser;
AddBusinessUser.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
//# sourceMappingURL=add-business-user.js.map