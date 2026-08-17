const { body } = require("express-validator");

const medicineValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Medicine name is required."),

  body("dosage")
    .trim()
    .notEmpty()
    .withMessage("Dosage is required."),

  body("type")
    .isIn([
      "capsule",
      "tablet",
      "cream",
      "drops",
      "syrup",
      "injection",
      "other"
    ])
    .withMessage("Invalid medicine type."),

  body("description")
    .optional()
    .trim(),

  body("activeIngredient")
    .trim()
    .notEmpty()
    .withMessage("Active ingredient is required"),
];

module.exports = medicineValidation;