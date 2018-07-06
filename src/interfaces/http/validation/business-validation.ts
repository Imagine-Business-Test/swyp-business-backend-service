import joi from "joi";

export const BusinessRule = {
  createBusiness: joi
    .object()
    .keys({
      account: joi
        .object()
        .keys({
          email: joi
            .string()
            .email()
            .required(),
          name: joi.string().required(),
          password: joi
            .string()
            .min(8)
            .required(),
          phone: joi.string().required(),
          role: joi
            .string()
            .allow(["worker", "admin"])
            .required()
        })
        .required(),
      logoUrl: joi.string().required(),
      name: joi.string().required()
    })
    .required(),

  addBusinessUser: joi
    .object()
    .keys({
      business: joi.string().required(),
      email: joi
        .string()
        .email()
        .required(),
      origin: joi
        .string()
        .required()
        .label("Origin to redirect user is missing"),
      name: joi.string().required(),
      phone: joi.string().required()
    })
    .required(),

  loginBusinessUser: joi
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
    .required(),

  deleteBusinessUser: joi
    .object()
    .keys({
      email: joi
        .string()
        .email()
        .required()
    })
    .required(),

  resetPassword: joi
    .object()
    .keys({
      email: joi
        .string()
        .email()
        .required(),
      password: joi
        .string()
        .min(8)
        .required(),
      token: joi.string().required()
    })
    .required()
};
