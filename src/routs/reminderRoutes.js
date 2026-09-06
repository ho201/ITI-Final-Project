const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares");

const validateSchema = require("../middlewares/validateSchema");

const {
  createReminderSchema,
  updateReminderSchema,
} = require("../validations/reminderValidation");

const {
  createReminder,
  getUserReminders,
  updateReminder,
  deleteReminder,
} = require("../controllers/reminderController");

router.post(
  "/",
  protect,
  validateSchema(createReminderSchema),
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
  validateSchema(updateReminderSchema),
  updateReminder
);

router.delete(
  "/:id",
  protect,
  deleteReminder
);

module.exports = router;