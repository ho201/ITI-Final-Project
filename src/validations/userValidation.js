const { z } = require("zod");

const nameRule = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be 100 characters or fewer");

const emailRule = z
  .string()
  .min(1, "Email is required")
  .email("Please provide a valid email address");

const passwordRule = z
  .string()
  .min(1, "Password is required")
  .min(6, "Password must be at least 6 characters");


const validateRegister = z.object({
  name: nameRule,
  email: emailRule,
  password: passwordRule,
});


const validateLogin = z.object({
  email: emailRule,
  password: passwordRule,
});


module.exports = {
  validateRegister,
  validateLogin,
};