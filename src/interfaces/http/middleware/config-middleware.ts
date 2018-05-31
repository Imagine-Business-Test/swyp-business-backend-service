import { Config } from "../../../contracts/config";

export const configMiddleware = (config: Config) => {
  return (req: any, _res: any, next: any) => {
    req.config = config;
    next();
  };
};


