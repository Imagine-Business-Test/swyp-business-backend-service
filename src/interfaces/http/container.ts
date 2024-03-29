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
  UpdateBusinessDetails,
  RequestPasswordReset,
  DeleteBusinessUser,
  DeleteBusinessBranch,
  LoginBusinessUser,
  CompleteUserSignup,
  CompleteUserSignupSubmit,
  UpdateUserDetails,
  UpdateBranchDetails,
  AddBusinessUser,
  AddBusinessBranch,
  CreateBusiness,
  GetBusinesses,
  ResetPassword
} from "../../app/business";

import {
  CreateWorkspace,
  DeleteWorkspace,
  GetWorkspaces
} from "../../app/workspace";

import {
  GetResponseByStatus,
  AddNoteToResponse,
  GetFormResponses,
  OfficialSignoff,
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

import { FileUploader } from "../../app/S3";

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
  getBusinessUserActivityStats: asClass(GetBusinessUserActivityStats),
  getWorkspaceForms: asClass(GetWorkspaceForms),
  updateFormContent: asClass(UpdateFormContent),
  getBusinessForms: asClass(GetBusinessForms),
  S3Uploader: asClass(FileUploader),
  disableForm: asClass(DisableForm),
  deleteForm: asClass(DeleteForm),
  createForm: asClass(CreateForm),

  updateBusinessDetails: asClass(UpdateBusinessDetails),
  updateBranchDetails: asClass(UpdateBranchDetails),
  requestPasswordReset: asClass(RequestPasswordReset),
  deleteBusinessBranch: asClass(DeleteBusinessBranch),
  deleteBusinessUser: asClass(DeleteBusinessUser),
  loginBusinessUser: asClass(LoginBusinessUser),
  CompleteUserSignup: asClass(CompleteUserSignup),
  CompleteUserSignupSubmit: asClass(CompleteUserSignupSubmit),
  updateUserDetails: asClass(UpdateUserDetails),
  addBusinessUser: asClass(AddBusinessUser),
  addBusinessBranch: asClass(AddBusinessBranch),
  createBusiness: asClass(CreateBusiness),
  resetPassword: asClass(ResetPassword),
  getBusinesses: asClass(GetBusinesses),
  getWorkspaces: asClass(GetWorkspaces),

  getResponseByStatus: asClass(GetResponseByStatus),
  addNoteToResponse: asClass(AddNoteToResponse),
  getFormResponses: asClass(GetFormResponses),
  officialSignoff: asClass(OfficialSignoff),
  recordResponse: asClass(RecordResponse),
  getFormContent: asClass(GetFormContent),
  deleteResponse: asClass(DeleteResponse),

  createWorkspace: asClass(CreateWorkspace),
  deleteWorkspace: asClass(DeleteWorkspace)
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
