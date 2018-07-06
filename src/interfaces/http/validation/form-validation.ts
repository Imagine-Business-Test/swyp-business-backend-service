import joi from "joi";

export const FormRules = {
  createForm: joi
    .object()
    .keys({
      content: joi.string().required(),
      name: joi.string().required(),
      workspace: joi.string().required()
    })
    .required(),

  deleteForm: joi
    .object()
    .keys({
      form: joi.string().required()
    })
    .required(),

  updateContent: {
    content: joi
      .object()
      .keys({
        content: joi.string().required()
      })
      .required(),
    form: joi
      .object()
      .keys({
        form: joi.string().required()
      })
      .required()
  },

  disableForm: joi
    .object()
    .keys({
      form: joi.string().required()
    })
    .required(),

  getABusinessForms: joi
    .object()
    .keys({
      business: joi.string().required()
    })
    .required(),

  getWorkspaceForms: joi
    .object()
    .keys({
      workspace: joi.string().required()
    })
    .required()
};
