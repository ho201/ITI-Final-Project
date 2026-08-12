const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {
  createHistory,
  getHistory,
  updateHistory,
} = require("../controllers/historyController");

const {
  createHistoryValidation,
  updateHistoryValidation,
} = require("../validations/history.validation");
router.post(
  "/",
  protect,
  createHistoryValidation,
  createHistory
);

router.get(
  "/",
  protect,
  getHistory
);

router.patch(
  "/:id",
  protect,
  updateHistoryValidation,
  updateHistory
);

module.exports = router;