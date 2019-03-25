import joi from "joi";

export const FileUploadRule = {
  newAsset: joi
    .object()
    .keys({
      assetType: joi
        .string()
        .valid([
          "official-signatures",
          "signatures",
          "passports",
          "videos",
          "pictures"
        ])
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
