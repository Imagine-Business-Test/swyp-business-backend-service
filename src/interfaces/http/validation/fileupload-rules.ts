import joi from "joi";

export const FileUploadRule = {
  passportSignature: joi
    .object()
    .keys({
      bankname: joi.string().required(),
      name: joi.string().required()
    })
    .required(),
  logo: joi
    .object()
    .keys({
      name: joi.string().required()
    })
    .required()
};
