import { MongoWorkspaceRepository } from "../../infra/workspace";
import { MongoBusinessRepository } from "../../infra/business";
import { MongoResponseRepository } from "../../infra/response";
import { MongoFormRepository } from "../../infra/form";
import { Application } from "../../app/application";
import mongoDB from "../../infra/database/mongodb";
import { WorkspaceSerializer } from "./workspace";
import { scopePerRequest } from "awilix-express";
import { BusinessSerializer } from "./business";
import { ResponseSerializer } from "./response";
import { Logger } from "../../infra/logging";
import { Mailer } from "../../services";
import { FormSerializer } from "./form";
import { HttpServer } from "./server";
import config from "../../config";
import router from "./router";

import {
  BusinessModel,
  ResponseModel,
  WorkspaceModel,
  FormModel
} from "../../infra/database/models";

import {
  createContainer,
  InjectionMode,
  asFunction,
  asClass,
  asValue
} from "awilix";

import {
  configMiddleware,
  devErrorHandler,
  logMiddleware,
  errorHandler,
  validator
} from "./middleware";

import {
  GetBusinessUserActivityStats,
  RequestPasswordReset,
  DeleteBusinessUser,
  LoginBusinessUser,
  UpdateUserBranch,
  AddBusinessUser,
  CreateBusiness,
  GetBusinesses,
  ResetPassword
} from "../../app/business";

import {
  GetBusinessWorkspaces,
  CreateWorkspace,
  DeleteWorkspace
} from "../../app/workspace";

import {
  UpdateResponseContent,
  GetResponseByStatus,
  AddNoteToResponse,
  GetFormResponses,
  ProcessResponse,
  RecordResponse,
  DeleteResponse
} from "../../app/response";

import {
  GetWorkspaceForms,
  UpdateFormContent,
  GetBusinessForms,
  GetFormContent,
  CreateForm,
  DeleteForm,
  DisableForm
} from "../../app/form";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

let ErrorHandler: any;
ErrorHandler =
  config.process.env === "production" ? errorHandler : devErrorHandler;

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
  validator: asValue(validator)
});

// Operations

container.register({
  getBusinessWorkspaces: asClass(GetBusinessWorkspaces),
  requestPasswordReset: asClass(RequestPasswordReset),
  deleteBusinessUser: asClass(DeleteBusinessUser),
  loginBusinessUser: asClass(LoginBusinessUser),
  updateUserBranch: asClass(UpdateUserBranch),
  addBusinessUser: asClass(AddBusinessUser),
  createBusiness: asClass(CreateBusiness),
  resetPassword: asClass(ResetPassword),
  getBusinesses: asClass(GetBusinesses),

  createWorkspace: asClass(CreateWorkspace),
  deleteWorkspace: asClass(DeleteWorkspace),

  updateResponseContent: asClass(UpdateResponseContent),
  getResponseByStatus: asClass(GetResponseByStatus),
  addNoteToResponse: asClass(AddNoteToResponse),
  getFormResponses: asClass(GetFormResponses),
  processResponse: asClass(ProcessResponse),
  recordResponse: asClass(RecordResponse),
  getFormContent: asClass(GetFormContent),
  deleteResponse: asClass(DeleteResponse),

  getBusinessUserActivityStats: asClass(GetBusinessUserActivityStats),
  getWorkspaceForms: asClass(GetWorkspaceForms),
  updateFormContent: asClass(UpdateFormContent),
  getBusinessForms: asClass(GetBusinessForms),
  disableForm: asClass(DisableForm),
  deleteForm: asClass(DeleteForm),
  createForm: asClass(CreateForm)
});

// Serializers

container.register({
  workspaceSerializer: asValue(WorkspaceSerializer),
  responseSerializer: asValue(ResponseSerializer),
  businessSerializer: asValue(BusinessSerializer),
  formSerializer: asValue(FormSerializer)
});

// Services

container.register({
  mailer: asClass(Mailer).singleton()
});

export default container;
