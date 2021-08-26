import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import Auth from "../endpoints/authRoutes";
import Comment from "../endpoints/commentRoutes";
import Institution from "../endpoints/institutionRoutes";
import Issues from "../endpoints/issuesRoutes";
import Permissions from "../endpoints/permissionRoutes";
import Product from "../endpoints/productRoutes";
import Role from "../endpoints/rolesRoutes";
import Tasks from "../endpoints/taskRoutes";

require("express-async-errors");

module.exports = (app) => {
  app.use(compression());
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
  app.use("/auth", Auth);
  app.use("/roles", Role);
  app.use("/tasks", Tasks);
  app.use("/comment", Comment);
  app.use("/nepserv", Institution);
  app.use("/products", Product);
  app.use("/issues", Issues);
  app.use("/nepserv", Permissions);
};
