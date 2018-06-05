import joi from "joi";

export const BusinessRule = {
  createBusiness: joi.object().keys({
    name: joi.string().required(),
    logoUrl: joi.string().required()
  }).required(),

  addBusinessUser: joi.object().keys({
    business: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    name: joi.string().required(),
    phone: joi.string().required()
  }).required(),

  loginBusinessUser: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
  }).required(),

  requestPasswordReset: joi.object().keys({
    email: joi.string().email().required()
  }).required(),

  deleteBusinessUser: joi.object().keys({
    email: joi.string().email().required()
  }).required(),

  resetPassword: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
  }).required()
};
