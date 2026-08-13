const { protect, authorizeRoles } = require("./authMiddleware.js");
const errorHandler = require("./errorHandle.js");
const logger = require("./logger.js");
const notFoundMiddleware = require("./notFoundMiddleware.js");
const { validateCreate, validateUpdate } = require("./reminderMiddleware.js");
const handleValidationErrors = require("./validationMiddleware.js");

module.exports = {
    protect,
    authorizeRoles,
    errorHandler,
    logger,
    notFoundMiddleware,
    validateCreate,
    validateUpdate,
    handleValidationErrors
};