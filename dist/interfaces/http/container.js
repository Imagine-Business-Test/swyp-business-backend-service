"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workspace_1 = require("../../infra/workspace");
const business_1 = require("../../infra/business");
const response_1 = require("../../infra/response");
const form_1 = require("../../infra/form");
const application_1 = require("../../app/application");
const mongodb_1 = __importDefault(require("../../infra/database/mongodb"));
const workspace_2 = require("./workspace");
const awilix_express_1 = require("awilix-express");
const business_2 = require("./business");
const response_2 = require("./response");
const logging_1 = require("../../infra/logging");
const services_1 = require("../../services");
const form_2 = require("./form");
const server_1 = require("./server");
const config_1 = __importDefault(require("../../config"));
const router_1 = __importDefault(require("./router"));
const models_1 = require("../../infra/database/models");
const awilix_1 = require("awilix");
const middleware_1 = require("./middleware");
const business_3 = require("../../app/business");
const workspace_3 = require("../../app/workspace");
const response_3 = require("../../app/response");
const form_3 = require("../../app/form");
const container = awilix_1.createContainer({
    injectionMode: awilix_1.InjectionMode.CLASSIC
});
let ErrorHandler;
ErrorHandler =
    config_1.default.process.env === "production" ? middleware_1.errorHandler : middleware_1.devErrorHandler;
container.register({
    database: awilix_1.asFunction(mongodb_1.default).singleton(),
    server: awilix_1.asClass(server_1.HttpServer).singleton(),
    router: awilix_1.asFunction(router_1.default).singleton(),
    logger: awilix_1.asFunction(logging_1.Logger).singleton(),
    app: awilix_1.asClass(application_1.Application).singleton(),
    config: awilix_1.asValue(config_1.default)
});
container.register({
    workspaceModel: awilix_1.asValue(models_1.WorkspaceModel),
    businessModel: awilix_1.asValue(models_1.BusinessModel),
    responseModel: awilix_1.asValue(models_1.ResponseModel),
    formModel: awilix_1.asValue(models_1.FormModel)
});
container.register({
    workspaceRepository: awilix_1.asClass(workspace_1.MongoWorkspaceRepository).singleton(),
    responseRepository: awilix_1.asClass(response_1.MongoResponseRepository).singleton(),
    businessRepository: awilix_1.asClass(business_1.MongoBusinessRepository).singleton(),
    formRepository: awilix_1.asClass(form_1.MongoFormRepository).singleton()
});
container.register({
    configMiddleware: awilix_1.asFunction(middleware_1.configMiddleware).singleton(),
    logMiddleware: awilix_1.asFunction(middleware_1.logMiddleware).singleton(),
    container: awilix_1.asValue(awilix_express_1.scopePerRequest(container)),
    errorHandler: awilix_1.asValue(ErrorHandler),
    validator: awilix_1.asValue(middleware_1.validator)
});
container.register({
    getBusinessWorkspaces: awilix_1.asClass(workspace_3.GetBusinessWorkspaces),
    requestPasswordReset: awilix_1.asClass(business_3.RequestPasswordReset),
    deleteBusinessUser: awilix_1.asClass(business_3.DeleteBusinessUser),
    loginBusinessUser: awilix_1.asClass(business_3.LoginBusinessUser),
    updateUserBranch: awilix_1.asClass(business_3.UpdateUserBranch),
    addBusinessUser: awilix_1.asClass(business_3.AddBusinessUser),
    createBusiness: awilix_1.asClass(business_3.CreateBusiness),
    resetPassword: awilix_1.asClass(business_3.ResetPassword),
    getBusinesses: awilix_1.asClass(business_3.GetBusinesses),
    createWorkspace: awilix_1.asClass(workspace_3.CreateWorkspace),
    deleteWorkspace: awilix_1.asClass(workspace_3.DeleteWorkspace),
    updateResponseContent: awilix_1.asClass(response_3.UpdateResponseContent),
    getResponseByStatus: awilix_1.asClass(response_3.GetResponseByStatus),
    addNoteToResponse: awilix_1.asClass(response_3.AddNoteToResponse),
    getFormResponses: awilix_1.asClass(response_3.GetFormResponses),
    processResponse: awilix_1.asClass(response_3.ProcessResponse),
    recordResponse: awilix_1.asClass(response_3.RecordResponse),
    getFormContent: awilix_1.asClass(form_3.GetFormContent),
    deleteResponse: awilix_1.asClass(response_3.DeleteResponse),
    getBusinessUserActivityStats: awilix_1.asClass(business_3.GetBusinessUserActivityStats),
    getWorkspaceForms: awilix_1.asClass(form_3.GetWorkspaceForms),
    updateFormContent: awilix_1.asClass(form_3.UpdateFormContent),
    getBusinessForms: awilix_1.asClass(form_3.GetBusinessForms),
    disableForm: awilix_1.asClass(form_3.DisableForm),
    deleteForm: awilix_1.asClass(form_3.DeleteForm),
    createForm: awilix_1.asClass(form_3.CreateForm)
});
container.register({
    workspaceSerializer: awilix_1.asValue(workspace_2.WorkspaceSerializer),
    responseSerializer: awilix_1.asValue(response_2.ResponseSerializer),
    businessSerializer: awilix_1.asValue(business_2.BusinessSerializer),
    formSerializer: awilix_1.asValue(form_2.FormSerializer)
});
container.register({
    mailer: awilix_1.asClass(services_1.Mailer).singleton()
});
exports.default = container;
//# sourceMappingURL=container.js.map