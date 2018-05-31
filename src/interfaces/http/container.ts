import {
  createContainer,
  InjectionMode,
  asFunction,
  asClass,
  asValue,
} from "awilix";

import {
  WorkstationModel,
  BusinessModel,
  ResponseModel,
  FormModel,
} from "../../infra/database/models";

import mongoDB from "../../infra/database/mongodb";
import { Application } from "../../app/application";

import { config }  from "../../config";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

// System
container.register({
  database: asFunction(mongoDB).singleton(),
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


export default container;
