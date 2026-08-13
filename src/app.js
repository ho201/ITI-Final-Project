const express = require("express");

const logger = require("./middlewares/logger");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorHandler = require("./middlewares/errorHandle");

const authRoutes = require("./routs/authRoutes");
const reminderRoutes = require("./routs/reminderRoutes");
const historyRoutes = require("./routs/historyRoutes");

const app = express();

app.use(express.json());

app.use(logger);

app.use("/api/auth", authRoutes);

app.use("/api/reminders", reminderRoutes);

app.use("/api/history", historyRoutes);

app.use(notFoundMiddleware);

app.use(errorHandler);

module.exports = app;