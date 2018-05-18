import mongoose from "mongoose";

import { Config } from "../../../contracts/config";
import { Logger } from "../../../contracts/infra";

export default (config: Config) => {
  return {
    authenticate(logger: Logger) {
      mongoose.connect(config.db.mongo_url)
        .then(() => logger.info("Connection to database esterblished "));
    }
  };
};
