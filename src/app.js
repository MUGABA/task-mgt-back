import express from "express";

import logger from "./helpers/logger";

const app = express();

require("./startups/errors")();
require("./startups/startup")(app);

const port = process.env.port || 5000;

const server = app.listen(port, logger.info(`Your listen to port ${port}`));
