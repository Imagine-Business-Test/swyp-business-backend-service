import joi from "joi";
import { Mail } from "../../contracts/config/mail";

const schema = joi.object().keys({
  MAILGUN_SECRET: joi.string().required(),
  MAILGUN_DOMAIN: joi.string().required()
}).unknown().required();

const { error, value } = joi.validate(process.env, schema);

if (error)
  throw new Error(`Config validation failed: ${error.message}`);

export const mail: Mail = {
  secret: <string>value.MAILGUN_SECRET,
  domain: <string>value.MAILGUN_DOMAIN
};
