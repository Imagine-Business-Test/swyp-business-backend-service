import joi from "joi";

export const WorkspaceRule = {
  createWorkspace: joi.object().keys({
    business: joi.string().required(),
    name: joi.string().required()
  }).required(),

  deleteWorkspace: joi.object().keys({
    id: joi.string().required()
  }).required(),

  getBusinessWorkspaces: joi.object().keys({
    business: joi.string().required()
  }).required()
};
