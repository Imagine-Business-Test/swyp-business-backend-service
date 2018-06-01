import { MongoWorkstationRepository } from "../../infra/workstation";
import { MongoResponseRepository } from "../../infra/response";
import { MongoBusinessRepository } from "../../infra/business";
import { MongoFormRepository } from "../../infra/form";
import { Application } from "../../app/application";
import mongoDB from "../../infra/database/mongodb";
import { scopePerRequest } from  "awilix-express";
import { BusinessSerializer } from "./business";
import { Logger } from "../../infra/logging";
import { HttpServer } from "./server";
import { config }  from "../../config";
import router from "./router";

import {
  WorkstationModel,
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
  CreateWorkstation,
  DeleteWorkstation,
  GetWorkstations,
} from "../../app/workstation";

import {
  RecordResponse,
  GetFormResponses,
  ProcessResponse,
  DeleteResponse,
  UpdateResponse,
} from "../../app/response";

import {
  GetWorkstationForms,
  DisableForm,
  DeleteForm,
  CreateForm
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
  workstationModel: asValue(WorkstationModel),
  businessModel: asValue(BusinessModel),
  responseModel: asValue(ResponseModel),
  formModel: asValue(FormModel)
});

// Repositories
container.register({
  workstationRepository: asClass(MongoWorkstationRepository).singleton(),
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
  requestPasswordReset: asClass(RequestPasswordReset),
  deleteBusinessUser: asClass(DeleteBusinessUser),
  loginBusinessUser: asClass(LoginBusinessUser),
  addBusinessUser: asClass(AddBusinessUser),
  createBusiness: asClass(CreateBusiness),
  resetPassword: asClass(ResetPassword),

  createWorkstation: asClass(CreateWorkstation),
  deleteWorkstation: asClass(DeleteWorkstation),
  getWorkstations: asClass(GetWorkstations),

  GetFormResponses: asClass(GetFormResponses),
  processResponse: asClass(ProcessResponse),
  recordResponse: asClass(RecordResponse),
  deleteResponse: asClass(DeleteResponse),
  updateResponse: asClass(UpdateResponse),

  getWorkstationForms: asClass(GetWorkstationForms),
  disableForm: asClass(DisableForm),
  deleteForm: asClass(DeleteForm),
  createForm: asClass(CreateForm)
});


 // Serializers

container.register({
  businessSerializer: asValue(BusinessSerializer)
});

export default container;
