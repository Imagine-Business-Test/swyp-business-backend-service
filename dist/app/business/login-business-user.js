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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const operation_1 = require("../operation");
class LoginBusinessUser extends operation_1.Operation {
    constructor(businessRepository, config) {
        super();
        this.businessRepository = businessRepository;
        this.config = config;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
            try {
                const business = yield this.businessRepository.findByAccountEmail(command.email);
                const user = business.getUser();
                const result = yield bcrypt_1.default.compare(command.password, user.password);
                if (!result) {
                    throw new Error("AuthenticationError");
                }
                const token = jsonwebtoken_1.default.sign({
                    email: user.email,
                    isBusiness: true,
                    name: user.name,
                    role: user.role
                }, this.config.web.json_secret, { expiresIn: "24h" });
                return this.emit(SUCCESS, { user, token, business });
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
exports.LoginBusinessUser = LoginBusinessUser;
LoginBusinessUser.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
//# sourceMappingURL=login-business-user.js.map