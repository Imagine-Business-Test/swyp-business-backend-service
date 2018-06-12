import { MongoWorkstationRepository } from "../../infra/workstation";
import { MongoResponseRepository } from "../../infra/response";
import { MongoBusinessRepository } from "../../infra/business";
import { MongoFormRepository } from "../../infra/form";
import { WorkStationSerializer } from "./workstation";
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
  GetBusinessWorkstations,
} from "../../app/workstation";

import {
  RecordResponse,
  GetFormResponses,
  UpdateResponseContent,
  ProcessResponse,
  DeleteResponse,
} from "../../app/response";

import {
  GetWorkstationForms,
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
  getBusinessWorkstations: asClass(GetBusinessWorkstations),
  requestPasswordReset: asClass(RequestPasswordReset),
  deleteBusinessUser: asClass(DeleteBusinessUser),
  loginBusinessUser: asClass(LoginBusinessUser),
  addBusinessUser: asClass(AddBusinessUser),
  createBusiness: asClass(CreateBusiness),
  resetPassword: asClass(ResetPassword),

  createWorkstation: asClass(CreateWorkstation),
  deleteWorkstation: asClass(DeleteWorkstation),

  updateResponseContent: asClass(UpdateResponseContent),
  getFormResponses: asClass(GetFormResponses),
  processResponse: asClass(ProcessResponse),
  recordResponse: asClass(RecordResponse),
  deleteResponse: asClass(DeleteResponse),

  getWorkstationForms: asClass(GetWorkstationForms),
  updateFormContent: asClass(UpdateFormContent),
  disableForm: asClass(DisableForm),
  deleteForm: asClass(DeleteForm),
  createForm: asClass(CreateForm)
});


 // Serializers

container.register({
  workstationSerializer: asValue(WorkStationSerializer),
  responseSerializer: asValue(ResponseSerializer),
  businessSerializer: asValue(BusinessSerializer),
  formSerializer: asValue(FormSerializer),
});

// Services

container.register({
  mailer: asClass(Mailer).singleton()
});

export default container;
