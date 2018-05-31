import joi from "joi";

export const FormRules = {
  createForm: joi.object().keys({
    workstation: joi.string().required(),
    content: joi.string().required(),
    name: joi.string().required()
  }).required(),

  deleteForm: joi.object().keys({
    form: joi.string().required()
  }).required(),

  disableForm: joi.object().keys({
    form: joi.string().required(),
  }).required(),

  getWorkstationForms: joi.object().keys({
    workstation: joi.string().required()
  })
};
