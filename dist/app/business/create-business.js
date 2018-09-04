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
const domain_1 = require("../../domain");
const operation_1 = require("../operation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class CreateBusiness extends operation_1.Operation {
    constructor(businessRepository, config, mailer) {
        super();
        this.businessRepository = businessRepository;
        this.config = config;
        this.mailer = mailer;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
            try {
                const { name, logoUrl, account, branches } = command;
                const slug = name.toLowerCase().replace(" ", "");
                const deleted = false;
                const approved = true;
                const newBusiness = new domain_1.Business(name, slug, approved, deleted, [], branches, logoUrl);
                const savedBusiness = yield this.businessRepository.add(newBusiness);
                account.password = yield bcrypt_1.default.hash(account.password, 10);
                const business = yield this.businessRepository.addAccount(savedBusiness.getId(), account);
                const user = business.getUser();
                this.mailer.welcomeAdmin(business.getName(), user.name, user.email);
                const token = jsonwebtoken_1.default.sign({
                    email: user.email,
                    isBusiness: true,
                    name: user.name,
                    role: user.role
                }, this.config.web.json_secret, { expiresIn: "24h" });
                return this.emit(SUCCESS, { business, user, token });
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
exports.CreateBusiness = CreateBusiness;
CreateBusiness.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
//# sourceMappingURL=create-business.js.map