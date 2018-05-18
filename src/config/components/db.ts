import {DB as Interface } from "../../contracts/config";
import joi from "joi";

const schema = joi.object().keys({
  MONGO_URL: joi.string().required()
}).unknown().required();

const { error, value } = joi.validate(process.env, schema);

if (error)
  throw new Error(`Config validation failed ${error.message}`);

export const db: Interface = {
  mongo_url: <string>value.MONGO_URL
};
