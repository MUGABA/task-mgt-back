import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import helmet from "helmet";

import Role from "../endpoints/rolesRoutes";
import Auth from "../endpoints/authRoutes";
import Tasks from "../endpoints/taskRoutes";
import Comment from "../endpoints/commentRoutes";
import Project from "../endpoints/projectRoutes";
import Institution from "../endpoints/institutionRoutes";
import Permissions from "../endpoints/permissionRoutes";
require("express-async-errors");

module.exports = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny"));
  }

  app.use(
    "/uploads",
    express.static(path.resolve(`${__dirname}/../../uploads`))
  );
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/nepserv", Auth);
  app.use("/nepserv", Role);
  app.use("/nepserv", Tasks);
  app.use("/nepserv", Comment);
  app.use("/nepserv", Project);
  app.use("/nepserv", Institution);
  app.use("/nepserv", Permissions);
};
