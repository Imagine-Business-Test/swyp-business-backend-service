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
const domain_1 = require("../../domain");
const slug_1 = __importDefault(require("slug"));
class CreateForm extends operation_1.Operation {
    constructor(formRepository, businessRepository, workspaceRepository) {
        super();
        this.workspaceRepo = workspaceRepository;
        this.businessRepo = businessRepository;
        this.formRepository = formRepository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
            try {
                const { formTypeId, name, elements, user } = command;
                const workspaceRecord = yield this.workspaceRepo.find(formTypeId);
                const partner = yield this.businessRepo.findByAccountEmail(user.email);
                const formtype = {
                    id: workspaceRecord.getId(),
                    name: workspaceRecord.getName(),
                    parent: workspaceRecord.getParent()
                };
                const business = {
                    id: partner.getId(),
                    slug: partner.getSlug(),
                    name: partner.getName()
                };
                const nameSlug = slug_1.default(name).toLowerCase();
                const status = "active";
                const form = yield this.formRepository.add(new domain_1.Form(name, nameSlug, formtype, business, elements, status, user, user, false));
                return this.emit(SUCCESS, form);
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
exports.CreateForm = CreateForm;
CreateForm.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
//# sourceMappingURL=create-form.js.map