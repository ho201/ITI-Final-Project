const express = require("express");

const logger = require("./middlewares/logger");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorHandler = require("./middlewares/errorHandle");

const authRoutes = require("./routs/authRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

app.use(express.json());

app.use(logger);

app.use("/api/auth", authRoutes);

app.use(notFoundMiddleware);

app.use(errorHandler);

app.use("/api/history", historyRoutes);

module.exports = app;
