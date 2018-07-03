import joi from "joi";

export const ResponseRule = {
  recordResponse: joi.object().keys({
    form: joi.string().required(),
    content: joi.string().required(),
    user: joi.object().keys({
      _id: joi.string().required(),
      email: joi.string().email().required(),
      firstname: joi.string().required(),
      lastname: joi.string().required(),
      phone: joi.string().required(),
      middlename: joi.string()
    }).required(),
  }).required(),

  updateContent: {
    content: joi.object().keys({
      content: joi.string().required(),
    }).required(),

    response: joi.object().keys({
      response: joi.string().required(),
    }).required()
  },

  getFormResponse: joi.object().keys({
    form: joi.string().required()
  }).required(),

  processResponse: joi.object().keys({
    response: joi.string().required()
  }).required(),

  deleteResponse: joi.object().keys({
    response: joi.string().required()
  }).required(),

  byStatus: {
    params: joi.object().keys({
      status: joi.string().required()
    }).required(),
    query: joi.object().keys({
      page: joi.number(),
      limit: joi.number()
    }).required()
  },

  addNotes: {
    params: joi.object().keys({
      response: joi.string().required()
    }).required(),
    body: joi.object().keys({
      note: joi.string().required()
    }).required()
  }
};
