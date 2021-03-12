import config from "config";
import { Pool } from "pg";

import logger from "../../helpers/logger";

const pool = new Pool({
  connectionString: config.get("dbUrl"),
});

pool.connect((err, res) => {
  if (err) logger.info("please check ypur connection", err);
  logger.info("your successfully connected to the database");
});

export default pool;
