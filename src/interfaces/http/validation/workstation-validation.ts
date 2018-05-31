import joi from "joi";

export const WorkstationRule = {
  createWorkstation: joi.object().keys({
    business: joi.string().required(),
    name: joi.string().required()
  }).required(),

  deleteWorkstation: joi.object().keys({
    workstation: joi.string().required()
  }).required(),

  getWorkstations: joi.object().keys({
    business: joi.string().required()
  }).required()
};
