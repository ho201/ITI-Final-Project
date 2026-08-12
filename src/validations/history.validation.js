const { body } = require("express-validator");

const createHistoryValidation = [
  body("medicineId")
    .notEmpty()
    .withMessage("Medicine ID is required")
    .isMongoId()
    .withMessage("Invalid Medicine ID"),

  body("reminderId")
    .notEmpty()
    .withMessage("Reminder ID is required")
    .isMongoId()
    .withMessage("Invalid Reminder ID"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Taken", "Missed"])
    .withMessage("Status must be either Taken or Missed"),

  body("takenAt")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),
];

const updateHistoryValidation = [
  body("status")
    .optional()
    .isIn(["Taken", "Missed"])
    .withMessage("Status must be either Taken or Missed"),

  body("takenAt")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),
];

module.exports = {
  createHistoryValidation,
  updateHistoryValidation,
};