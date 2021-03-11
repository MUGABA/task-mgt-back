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


module.exports = (textQuery) => {
    return new Promise((reject, resolve) => {
        pool.query(textQuery, (err, res) => {
            if (!err) {
                return res
            }
            return err
        })
    })
}

export default pool;