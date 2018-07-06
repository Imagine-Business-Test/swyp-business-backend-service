import joi from "joi";
import { ICommons as Interface } from "../../contracts/config";

const schema = joi
  .object()
  .keys({
    PORT: joi.string().required(),
    PROCESS_TYPE: joi
      .string()
      .allow(["web"])
      .required(),
    NODE_ENV: joi
      .string()
      .allow(["development", "production", "test"])
      .required()
  })
  .unknown()
  .required();

const { error, value } = joi.validate(process.env, schema);

if (error) {
  throw new Error(`Config validation failed ${error.message}`);
}

export const commons: Interface = {
  process: {
    env: value.NODE_ENV as string,
    port: value.PORT as string,
    type: value.PROCESS_TYPE as string
  }
};
