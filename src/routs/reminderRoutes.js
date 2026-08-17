const express = require("express");
const router = express.Router();

const {
  protect,
  validateCreate,
  validateUpdate,
} = require("../middlewares");

const {
  createReminder,
  getUserReminders,
  updateReminder,
  deleteReminder,
} = require("../controllers/reminderController");


router.post(
  "/",
  protect,
  validateCreate,
  createReminder
);


router.get(
  "/",
  protect,
  getUserReminders
);


router.patch(
  "/:id",
  protect,
  validateUpdate,
  updateReminder
);


router.delete(
  "/:id",
  protect,
  deleteReminder
);


module.exports = router;