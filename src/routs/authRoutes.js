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
} = require("../middlewares");

const validateSchema = require("../middlewares/validateSchema");

const {
  validateRegister,
  validateLogin,
} = require("../validations/userValidation");


router.post(
  "/register",
  validateSchema(validateRegister),
  register
);


router.post(
  "/login",
  validateSchema(validateLogin),
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