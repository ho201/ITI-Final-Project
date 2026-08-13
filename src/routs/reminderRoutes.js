const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {
    createReminder,
    getUserReminders,
    updateReminder,
    deleteReminder
} = require("../controllers/reminderController");

const {
    validateCreate,
    validateUpdate
} = require("../middlewares/reminderMiddleware");


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