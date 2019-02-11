import joi from "joi";

export const FileUploadRule = {
  newAsset: joi
    .object()
    .keys({
      assetType: joi
        .string()
        .valid(["signatures", "passports", "official-signatures"])
        .required(),
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
