import mongoose from "mongoose";

import { Config } from "../../../contracts/config";
import { Logger } from "../../../contracts/infra";

export default (config: Config) => {
  return {
    authenticate(logger: Logger): void {
      mongoose.connect(config.db.mongo_url)
        .then(() => logger.info("Connection to database esterblished "));
    },

    drop(logger: Logger): void {
      mongoose.connect(config.db.mongo_url)
        .then((conn: any) => {
          conn.db.dropDatabase();
          logger.info("Dropped database");
        });
    }
  };
};
