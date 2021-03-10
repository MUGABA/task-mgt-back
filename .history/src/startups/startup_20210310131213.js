import express from "express";
import morgan from "morgan";

import Role from "../endpoints/rolesRoutes";
import Auth from "../endpoints/authRoutes";

require("express-async-errors");

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    if (process.env.NODE_ENV === "development") {
        app.use(morgan("tiny"));
    }
    app.use("/nepserv", Auth)

    app.use("/nepserv", Role);
};