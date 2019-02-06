import joi from "joi";

export const UserRules = {
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

  addUser: joi
    .object()
    .keys({
      business: joi.string().required(),
      branch: joi.string().required(),
      role: joi
        .string()
        .required()
        .allow(["admin", "worker"])
        .label("User role"),
      email: joi
        .string()
        .email()
        .required(),
      origin: joi
        .string()
        .required()
        .label("Url to redirect user"),
      name: joi.string().required(),
      phone: joi.string().required()
    })
    .required(),

  deleteUser: joi
    .object()
    .keys({
      email: joi
        .string()
        .email()
        .required()
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
