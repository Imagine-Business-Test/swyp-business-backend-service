import { scopePerRequest } from "awilix-express";
import { Application } from "../../app/application";
import config from "../../config";
import { MongoBusinessRepository } from "../../infra/business";
import mongoDB from "../../infra/database/mongodb";
import { MongoFormRepository } from "../../infra/form";
import { Logger } from "../../infra/logging";
import { MongoResponseRepository } from "../../infra/response";
import { MongoWorkspaceRepository } from "../../infra/workspace";
import { Mailer } from "../../services";
import { BusinessSerializer } from "./business";
import { FormSerializer } from "./form";
import { ResponseSerializer } from "./response";
import { HttpServer } from "./server";
import { WorkspaceSerializer } from "./workspace";

import router from "./router";

import {
  BusinessModel,
  FormModel,
  ResponseModel,
  WorkspaceModel
} from "../../infra/database/models";

import {
  asClass,
  asFunction,
  asValue,
  createContainer,
  InjectionMode
} from "awilix";

import {
  configMiddleware,
  devErrorHandler,
  errorHandler,
  logMiddleware,
  validator
} from "./middleware";

import {
  AddBusinessUser,
  CreateBusiness,
  DeleteBusinessUser,
  GetBusinessUserActivityStats,
  LoginBusinessUser,
  RequestPasswordReset,
  ResetPassword
} from "../../app/business";

import {
  CreateWorkspace,
  DeleteWorkspace,
  GetBusinessWorkspaces
} from "../../app/workspace";

import {
  AddNoteToResponse,
  DeleteResponse,
  GetFormResponses,
  GetResponseByStatus,
  ProcessResponse,
  RecordResponse,
  UpdateResponseContent
} from "../../app/response";

import {
  CreateForm,
  DeleteForm,
  DisableForm,
  GetBusinessForms,
  GetWorkspaceForms,
  UpdateFormContent
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
