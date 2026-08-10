const express = require("express");
const router = express.Router();

const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { validateRegister, validateLogin } = require("../validations/userValidation");


//POST /auth/register
router.post("/register", validateRegister, register);


//POST /auth/login
router.post("/login", validateLogin, login);

//GET /auth/me
router.get("/me", protect, getMe);

module.exports = router;
