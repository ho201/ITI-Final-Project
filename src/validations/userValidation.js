const { body } = require("express-validator");
// الـ userValidation.js بيفحص البيانات أول ما تيجي من الـ Request وقبل ما تدخل الـ Controller.
// الـ Model بيحدد شكل البيانات وقواعدها داخل MongoDB.

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


// const registerValidation = [nameRule, emailRule, passwordRule];


// const loginValidation = [emailRule, passwordRule];

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
