const historyService = require("../services/historyService");
const responseHandler = require("../utils/responseHandler");

const createHistory = async (req, res, next) => {
  try {
    const { medicineId, reminderId, status, takenAt } = req.body;

    const history = await historyService.createHistory({
      userId: req.user._id,
      medicineId,
      reminderId,
      status,
      takenAt,
    });

    return responseHandler(
      res,
      201,
      "History created successfully.",
      { history }
    );
  } catch (err) {
    next(err);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const history = await historyService.getHistory(req.user._id);

    return responseHandler(
      res,
      200,
      "History retrieved successfully.",
      { history }
    );
  } catch (err) {
    next(err);
  }
};

const updateHistory = async (req, res, next) => {
  try {
    const history = await historyService.updateHistory(
      req.params.id,
      req.user._id,
      req.body
    );

    return responseHandler(
      res,
      200,
      "History updated successfully.",
      { history }
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createHistory,
  getHistory,
  updateHistory,
};