import joi from "joi";

function validateBody(req: any, rule: any) {
  validate(req.body, rule);
}

function validateParams(req: any, rule: any) {
  validate(req.params, rule);
}

function validateQuery(req: any, rule: any) {
  validate(req.query, rule);
}

function validate(obj: any, rule: any) {

  const result = joi.validate(obj, rule, { abortEarly: false });
  if (result.error) {
    result.error.message = "ValidationError";
    throw result.error;
  }
}

export const validator = (req: any, _res: any, next: any) => {
  req.validateBody = validateBody.bind(null, req);
  req.validateParams = validateParams.bind(null, req);
  req.validateQuery = validateQuery.bind(null, req);
  next();
};
