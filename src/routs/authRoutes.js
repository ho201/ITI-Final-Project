const express = require("express");

const router = express.Router();

const {
  register,
  login,
  profile,
  getAllUsers,
} = require("../controllers/authController");

const {
  protect,
  authorizeRoles,
  handleValidationErrors,
} = require("../middlewares");

const {
  validateRegister,
  validateLogin,
} = require("../validations/userValidation");


router.post(
  "/register",
  validateRegister,
  handleValidationErrors,
  register
);


router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  login
);


router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);


router.get(
  "/profile",
  protect,
  profile
);

module.exports = router;