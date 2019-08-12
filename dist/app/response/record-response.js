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
class RecordResponse extends operation_1.Operation {
    constructor(responseRepository, formRepository, mailer) {
        super();
        this.responseRepository = responseRepository;
        this.formResponse = formRepository;
        this.mailer = mailer;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR, DATABASE_ERROR } = this.outputs;
            try {
                const { content, user, branch } = command;
                const form = yield this.formResponse.find(command.form);
                yield this.responseRepository.add(form.createResponse(content, user, branch));
                let hasEmail = false;
                let email = "", firstname = "", lastname = "";
                content.forEach((elem) => {
                    hasEmail = true;
                    const { questionType, answer } = elem;
                    if (questionType == "email") {
                        hasEmail = true;
                        email = answer;
                    }
                    else if (questionType == "firstname") {
                        firstname = answer;
                    }
                    else if (questionType == "lastname") {
                        lastname = answer;
                    }
                });
                if (hasEmail) {
                    this.mailer.sendFormSubmitted(`${lastname} ${firstname}`, email);
                }
                return this.emit(SUCCESS, { created: "success" });
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
exports.RecordResponse = RecordResponse;
RecordResponse.setOutputs(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
//# sourceMappingURL=record-response.js.map