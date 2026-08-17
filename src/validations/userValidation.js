const { body } = require("express-validator");

const nameRule = body("name")
  .notEmpty()
  .withMessage("Name is required")
  .isLength({ max: 100 })
  .withMessage("Name must be 100 characters or fewer");

const emailRule = body("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Please provide a valid email address");

const passwordRule = body("password")
  .notEmpty()
  .withMessage("Password is required")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters");


const validateRegister = [
  nameRule,
  emailRule,
  passwordRule
];

const validateLogin = [
  emailRule,
  passwordRule
];

module.exports = { validateRegister, validateLogin };
