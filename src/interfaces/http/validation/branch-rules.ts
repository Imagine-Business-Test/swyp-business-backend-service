import joi from "joi";

export const BranchRules = {
  resetPassword: joi
    .object()
    .keys({
      password: joi
        .string()
        .min(8)
        .required(),
      token: joi.string().required()
    })
    .required(),

  addBranch: joi
    .object()
    .keys({
      name: joi.string().required(),
      area: joi.string().required(),
      state: joi.string().required(),
      origin: joi.string().required(),
      business: joi.string().required(),
      stateId: joi.string().required(),
      address: joi.string().required(),
      updatedAt: joi.date(),
      created: joi.date(),
      deleted: joi.boolean()
    })
    .required(),

  deleteBranch: joi
    .object()
    .keys({
      name: joi.string().required()
    })
    .required(),

  loginUser: joi
    .object()
    .keys({
      email: joi
        .string()
        .email()
        .required(),
      password: joi
        .string()
        .min(8)
        .required()
    })
    .required(),

  requestPasswordReset: joi
    .object()
    .keys({
      email: joi
        .string()
        .email()
        .required(),
      origin: joi
        .string()
        .required()
        .label("Origin to redirect user is missing")
    })
    .required()
};
