import { MongoWorkspaceRepository } from "../../infra/workspace";
import { MongoResponseRepository } from "../../infra/response";
import { MongoBusinessRepository } from "../../infra/business";
import { MongoFormRepository } from "../../infra/form";
import { WorkspaceSerializer } from "./workspace";
import { Application } from "../../app/application";
import mongoDB from "../../infra/database/mongodb";
import { scopePerRequest } from  "awilix-express";
import { ResponseSerializer } from "./response";
import { BusinessSerializer } from "./business";
import { Logger } from "../../infra/logging";
import { HttpServer } from "./server";
import  config from "../../config";
import { Mailer } from "../../services";
import { FormSerializer } from "./form";

import router from "./router";

import {
  WorkspaceModel,
  BusinessModel,
  ResponseModel,
  FormModel,
} from "../../infra/database/models";

import {
  createContainer,
  InjectionMode,
  asFunction,
  asClass,
  asValue,
} from "awilix";

import {
  validator,
  errorHandler,
  logMiddleware,
  devErrorHandler,
  configMiddleware,
} from "./middleware";

import {
  RequestPasswordReset,
  DeleteBusinessUser,
  AddBusinessUser,
  LoginBusinessUser,
  CreateBusiness,
  ResetPassword
} from "../../app/business";

import {
  CreateWorkspace,
  DeleteWorkspace,
  GetBusinessWorkspaces,
} from "../../app/workspace";

import {
  UpdateResponseContent,
  GetResponseByStatus,
  AddNoteToResponse,
  GetFormResponses,
  ProcessResponse,
  RecordResponse,
  DeleteResponse,
} from "../../app/response";

import {
  GetWorkspaceForms,
  GetSimilarForms,
  DisableForm,
  DeleteForm,
  CreateForm,
  UpdateFormContent
} from "../../app/form";



const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

let ErrorHandler: any;
ErrorHandler = config.process.env === "production" ? errorHandler : devErrorHandler;

// System
container.register({
  database: asFunction(mongoDB).singleton(),
  server: asClass(HttpServer).singleton(),
  router: asFunction(router).singleton(),
  logger: asFunction(Logger).singleton(),
  app: asClass(Application).singleton(),
  config: asValue(config)
});

// Data Models
container.register({
  workspaceModel: asValue(WorkspaceModel),
  businessModel: asValue(BusinessModel),
  responseModel: asValue(ResponseModel),
  formModel: asValue(FormModel)
});

// Repositories
container.register({
  workspaceRepository: asClass(MongoWorkspaceRepository).singleton(),
  responseRepository: asClass(MongoResponseRepository).singleton(),
  businessRepository: asClass(MongoBusinessRepository).singleton(),
  formRepository: asClass(MongoFormRepository).singleton()
});


// Middleware
container.register({
  configMiddleware: asFunction(configMiddleware).singleton(),
  logMiddleware: asFunction(logMiddleware).singleton(),
  container: asValue(scopePerRequest(container)),
  errorHandler: asValue(ErrorHandler),
  validator: asValue(validator),
});


// Operations

container.register({
  getBusinessWorkspaces: asClass(GetBusinessWorkspaces),
  requestPasswordReset: asClass(RequestPasswordReset),
  deleteBusinessUser: asClass(DeleteBusinessUser),
  loginBusinessUser: asClass(LoginBusinessUser),
  addBusinessUser: asClass(AddBusinessUser),
  createBusiness: asClass(CreateBusiness),
  resetPassword: asClass(ResetPassword),

  createWorkspace: asClass(CreateWorkspace),
  deleteWorkspace: asClass(DeleteWorkspace),

  updateResponseContent: asClass(UpdateResponseContent),
  getResponseByStatus: asClass(GetResponseByStatus),
  addNoteToResponse: asClass(AddNoteToResponse),
  getFormResponses: asClass(GetFormResponses),
  processResponse: asClass(ProcessResponse),
  recordResponse: asClass(RecordResponse),
  deleteResponse: asClass(DeleteResponse),

  getWorkspaceForms: asClass(GetWorkspaceForms),
  updateFormContent: asClass(UpdateFormContent),
  getSimilarForms: asClass(GetSimilarForms),
  disableForm: asClass(DisableForm),
  deleteForm: asClass(DeleteForm),
  createForm: asClass(CreateForm)
});


 // Serializers

container.register({
  workspaceSerializer: asValue(WorkspaceSerializer),
  responseSerializer: asValue(ResponseSerializer),
  businessSerializer: asValue(BusinessSerializer),
  formSerializer: asValue(FormSerializer),
});

// Services

container.register({
  mailer: asClass(Mailer).singleton()
});

export default container;
