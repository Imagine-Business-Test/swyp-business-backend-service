/* tslint:disable: variable-name */
import { IConfig } from "../../../contracts/config";

export const configMiddleware = (config: IConfig) => {
  return (req: any, _res: any, next: any) => {
    req.config = config;
    next();
  };
};
