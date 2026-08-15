const History = require("../models/History");
const responseHandler = require("../utils/responseHandler");

const createHistory = async (req, res, next) => {
  try {
    const { medicineId, reminderId, status, takenAt } = req.body;

    const history = await History.create({
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
    const history = await History.find({ userId: req.user._id })
      .populate("medicineId")
      .populate("reminderId")
      .sort({ createdAt: -1 });

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
    const history = await History.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!history) {
      const error = new Error("History record not found.");
      error.statusCode = 404;
      throw error;
    }

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