require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const config = require("./config/config");

const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

startServer();