const express = require("express");
const router = express.Router();

const { register, login, profile, getAllUsers,} = require("../controllers/authController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const { validateRegister, validateLogin } = require("../validations/userValidation");


router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);

router.get("/users", protect, authorizeRoles("admin"), getAllUsers);

router.get("/profile", protect, profile);

module.exports = router;
