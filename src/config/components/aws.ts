import { IAWS as Interface } from "../../contracts/config";
import joi from "joi";

const schema = joi
  .object()
  .keys({
    AWS_ACCESS_KEY: joi.string().required(),
    AWS_SECRET_KEY: joi.string().required()
  })
  .unknown()
  .required();

const { error, value } = joi.validate(process.env, schema);

if (error) {
  throw new Error(`Config validation failed ${error.message}`);
}

export const AWS: Interface = {
  secretAccessKey: value.AWS_SECRET_KEY as string,
  accessKeyId: value.AWS_ACCESS_KEY as string
};
