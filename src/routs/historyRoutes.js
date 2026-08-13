const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const handleValidationErrors = require("../middlewares/validationMiddleware");
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
    handleValidationErrors,
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
    handleValidationErrors,
    updateHistory
);

module.exports = router;