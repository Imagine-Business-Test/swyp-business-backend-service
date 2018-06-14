import { Commons as Interface } from "../../contracts/config";
import joi from "joi";

const schema = joi.object().keys({
  PORT: joi.number().required(),
  PROCESS_TYPE: joi.string().allow(["web"]).required(),
  NODE_ENV: joi.string().allow(["development", "production", "test"]).required()
}).unknown().required();

const { error, value } = joi.validate(process.env, schema);


if (error)
  throw new Error(`Config validation failed ${error.message}`);

export const commons: Interface = {
  process: {
    env: <string>value.NODE_ENV,
    port: <string>value.PORT,
    type: <string>value.PROCESS_TYPE
  }
};
