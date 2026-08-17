const express = require("express");

const {
    logger,
    notFoundMiddleware,
    errorHandler
} = require("./middlewares");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

const authRoutes = require("./routs/authRoutes");
const reminderRoutes = require("./routs/reminderRoutes");
const historyRoutes = require("./routs/historyRoutes");
const medicineRoutes = require("./routs/medicineRoutes");

const app = express();

app.use(express.json());

app.use(logger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/medicines", medicineRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/reminders", reminderRoutes);

app.use("/api/history", historyRoutes);

app.use(notFoundMiddleware);

app.use(errorHandler);

module.exports = app;