import express from "express";

import logger from "./helpers/logger";

import tb from "./database/connections/tables";

const app = express();

require("./startups/errors")();
require("./startups/startup")(app);

// // tb.createTasksTable();
// tb.createRolesTable();
// tb.createRanksTable();
// tb.createUsersTable()
// tb.createEnum();

const port = process.env.port || 5000;

const server = app.listen(port, logger.info(`Your listen to port ${port}`));