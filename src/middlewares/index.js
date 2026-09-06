const { protect, authorizeRoles } = require("./authMiddleware.js");

const errorHandler = require("./errorHandle.js");

const logger = require("./logger.js");

const notFoundMiddleware = require("./notFoundMiddleware.js");

const upload = require("./uploadMiddleware.js");

module.exports = {
  protect,
  authorizeRoles,
  errorHandler,
  logger,
  notFoundMiddleware,
  upload
};