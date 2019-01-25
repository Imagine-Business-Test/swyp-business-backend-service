import joi from "joi";

export const ResponseRule = {
  recordResponse: joi
    .object()
    .keys({
      content: joi.array().items(
        joi.object().keys({
          questionType: joi.string().required(),
          questionId: joi.string().required(),
          question: joi.string().required(),
          answer: joi.string().required()
        })
      ),
      form: joi.string().required(),
      branch: joi.string().required(),
      user: joi
        .object()
        .keys({
          id: joi.string().required(),
          email: joi.string().email(),
          firstname: joi.string().required(),
          lastname: joi.string().required(),
          middlename: joi.string(),
          phone: joi.string().required()
        })
        .required()
    })
    .required(),

  updateContent: {
    content: joi
      .object()
      .keys({
        content: joi.string().required()
      })
      .required(),

    response: joi
      .object()
      .keys({
        response: joi.string().required()
      })
      .required()
  },

  getFormResponse: joi
    .object()
    .keys({
      form: joi.string().required()
    })
    .required(),

  processResponse: joi
    .object()
    .keys({
      response: joi.string().required()
    })
    .required(),

  deleteResponse: joi
    .object()
    .keys({
      response: joi.string().required()
    })
    .required(),

  byStatus: {
    params: joi
      .object()
      .keys({
        status: joi.string().required()
      })
      .required(),
    query: joi
      .object()
      .keys({
        business: joi.string().required(),
        limit: joi.number(),
        page: joi.number(),
        from: joi.date(),
        to: joi.date()
      })
      .required()
  },

  addNotes: {
    body: joi
      .object()
      .keys({
        note: joi.string().required()
      })
      .required(),
    params: joi
      .object()
      .keys({
        response: joi.string().required()
      })
      .required()
  }
};
