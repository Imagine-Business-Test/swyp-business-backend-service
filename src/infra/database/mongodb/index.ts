import mongoose from "mongoose";

import { IConfig } from "../../../contracts/config";
import { Logger } from "../../../contracts/infra";

export default (config: IConfig) => {
  return {
    authenticate(logger: Logger) {
      return mongoose
        .connect(config.db.mongo_url)
        .then(() => logger.info("Connection to database established "))
        .catch(err => logger.error(err.message));
    },

    drop(logger: Logger): void {
      mongoose.connect(config.db.mongo_url).then((conn: any) => {
        conn.db.dropDatabase();
        logger.info("Dropped database");
      });
    }
  };
};
