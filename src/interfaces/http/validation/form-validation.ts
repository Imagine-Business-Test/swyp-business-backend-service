import joi from "joi";

export const FormRules = {
  createForm: joi
    .object()
    .keys({
      name: joi.string().required(),
      elements: joi.array().required(),
      formTypeId: joi.string().required()
    })
    .required(),

  deleteForm: joi
    .object()
    .keys({
      form: joi.string().required()
    })
    .required(),

  getContentOf: joi
    .object()
    .keys({
      formType: joi.string().required(),
      parent: joi.string().required(),
      form: joi.string().required(),
      biz: joi.string().required()
    })
    .required(),

  disableForm: joi
    .object()
    .keys({
      form: joi.string().required()
    })
    .required(),

  getABusinessForms: joi
    .object()
    .keys({
      business: joi.string().required(),
      formtype: joi.string().required()
    })
    .required(),

  getWorkspaceForms: joi
    .object()
    .keys({
      workspace: joi.string().required()
    })
    .required()
};
