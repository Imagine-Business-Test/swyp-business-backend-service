import joi from "joi";
import { IWeb as Interface } from "../../contracts/config";

const schema = joi
  .object()
  .keys({
    JSON_SECRET: joi.string().required()
  })
  .unknown()
  .required();

const { error, value } = joi.validate(process.env, schema);

if (error) {
  throw new Error(`config validation failed: ${error.message}`);
}

export const web: Interface = {
  json_secret: value.JSON_SECRET as string
};
