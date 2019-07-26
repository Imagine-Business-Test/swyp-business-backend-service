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
          firstname: joi.string().required(),
          lastname: joi.string().required(),
          branch: joi.string().required(),
          password: joi
            .string()
            .min(8)
            .required(),
          phone: joi.string().required(),
          role: joi
            .string()
            .valid(["admin", "initiator", "approver"])
            .label("User role")
            .required()
        })
        .required(),
      name: joi.string().required(),
      branches: joi.array().items(
        joi.object().keys({
          name: joi.string().required(),
          area: joi.string().required(),
          state: joi.string().required(),
          address: joi.string().required()
        })
      )
    })
    .required(),

  updateBranch: joi
    .object()
    .keys({
      userId: joi.string().required(),
      branch: joi.string().required()
    })
    .required(),

  updateDetails: joi
    .object()
    .keys({
      id: joi.string().required(),
      logoUrl: joi.string().required(),
      description: joi.string().required()
    })
    .required()
};
