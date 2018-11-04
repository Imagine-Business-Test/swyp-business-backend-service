import joi from "joi";

export const WorkspaceRule = {
  createWorkspace: joi
    .object()
    .keys({
      name: joi.string().required(),
      parent: joi
        .string()
        .allow(["Individual", "Corporate"])
        .required()
    })
    .required(),

  deleteWorkspace: joi
    .object()
    .keys({
      id: joi.string().required()
    })
    .required()
};
