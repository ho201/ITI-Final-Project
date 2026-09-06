const express = require("express");

const router = express.Router();

const {
  protect,
} = require("../middlewares");

const {
  createHistory,
  getHistory,
  updateHistory,
} = require("../controllers/historyController");

const {
  createHistoryValidation,
  updateHistoryValidation,
} = require("../validations/history.validation");

const validateSchema = require("../middlewares/validateSchema");

router.post(
  "/",
  protect,
  validateSchema(createHistoryValidation),
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
  validateSchema(updateHistoryValidation),
  updateHistory
);

module.exports = router;