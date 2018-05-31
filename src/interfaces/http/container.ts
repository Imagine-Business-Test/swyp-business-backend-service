import { MongoWorkstationRepository } from "../../infra/workstation";
import { MongoResponseRepository } from "../../infra/response";
import { MongoBusinessRepository } from "../../infra/business";
import { MongoFormRepository } from "../../infra/form";
import { Application } from "../../app/application";
import mongoDB from "../../infra/database/mongodb";
import { scopePerRequest } from  "awilix-express";
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
  AddBusinessAccount,
  LoginBusinessUser,
  CreateBusiness,
  ResetPassword
} from "../../app/business";

import {
  CreateWorkStation,
  DeleteWorkstation,
  GetWorkstations,
} from "../../app/workstation";

import {
  RecordFormResponse,
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
  app: asClass(Application).singleton(),
  server: asClass(HttpServer).singleton(),
  config: asValue(config),
  router: asFunction(router).singleton()
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
  containerMiddleware: asValue(scopePerRequest(container)),
  logMiddleware: asFunction(logMiddleware).singleton(),
  errorHandler: asValue(ErrorHandler),
  validator: asValue(validator),
});


// Operations

container.register({
  requestPasswordReset: asClass(RequestPasswordReset),
  deleteBusinessUser: asClass(DeleteBusinessUser),
  addBusinessAccount: asClass(AddBusinessAccount),
  loginBusinessUser: asClass(LoginBusinessUser),
  createBusiness: asClass(CreateBusiness),
  resetPassword: asClass(ResetPassword),


  createWorkStation: asClass(CreateWorkStation),
  deleteWorkStation: asClass(DeleteWorkstation),
  getWorkstations: asClass(GetWorkstations),

  recordFormResponse: asClass(RecordFormResponse),
  getFormResponses: asClass(GetFormResponses),
  processResponse: asClass(ProcessResponse),
  deleteResponse: asClass(DeleteResponse),
  updateResponse: asClass(UpdateResponse),


  getWorkstationForms: asClass(GetWorkstationForms),
  disableForm: asClass(DisableForm),
  deleteForm: asClass(DeleteForm),
  createForm: asClass(CreateForm)
});

export default container;
