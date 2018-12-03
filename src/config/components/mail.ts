import joi from "joi";
import { IMail } from "../../contracts/config/mail";

const schema = joi
  .object()
  .keys({
    MAILGUN_SECRET: joi.string().required(),
    MAILGUN_DOMAIN: joi.string().required()
  })
  .unknown()
  .required();

const { error, value } = joi.validate(process.env, schema);

if (error) {
  throw new Error(`Config validation failed: ${error.message}`);
}

export const mail: IMail = {
  secret: value.MAILGUN_SECRET as string,
  domain: value.MAILGUN_DOMAIN as string
};
