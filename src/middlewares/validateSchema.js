const responseHandler = require("../utils/responseHandler.js");

const validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      const data = schema.parse(req.body);

      req.body = data;

      next();
    } catch (error) {
      const errorMessages = error.issues.map((err) => err.message);

      return responseHandler(
        res,
        400,
        "Validation Error",
        errorMessages
      );
    }
  };
};

module.exports = validateSchema;