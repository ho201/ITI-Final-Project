const { body, validationResult } = require("express-validator");


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


const registerValidation = [nameRule, emailRule, passwordRule];


const loginValidation = [emailRule, passwordRule];


const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};


const validateRegister = [...registerValidation, handleValidationErrors];

const validateLogin = [...loginValidation, handleValidationErrors];

module.exports = { validateRegister, validateLogin };
