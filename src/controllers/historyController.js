const History = require("../models/History");
const Medicine = require("../models/Medicine");
const Reminder = require("../models/Reminder");
const responseHandler = require("../utils/responseHandler");

const createHistory = async (req, res, next) => {
  try {
    const { medicineId, reminderId, status, takenAt } = req.body;

    // Check if medicine exists
    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      const error = new Error("Medicine not found.");
      error.statusCode = 404;
      throw error;
    }

    // Check if reminder exists
    const reminder = await Reminder.findById(reminderId);

    if (!reminder) {
      const error = new Error("Reminder not found.");
      error.statusCode = 404;
      throw error;
    }

    // Check if reminder belongs to this medicine
    if (reminder.medicineId.toString() !== medicineId.toString()) {
      const error = new Error(
        "Reminder does not belong to this medicine."
      );
      error.statusCode = 400;
      throw error;
    }

    // Create history
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
    const { status, medicineId, search } = req.query;

    // Base filter: get history for logged-in user only
    const filter = {
      userId: req.user._id,
    };

    // Filter by status
    if (status) {
      filter.status = status;
    }

    // Filter by medicine ID
    if (medicineId) {
      filter.medicineId = medicineId;
    }

    // Get history records
    const history = await History.find(filter)
      .populate("medicineId")
      .populate("reminderId")
      .sort({ createdAt: -1 });

    // Search by medicine name
    let filteredHistory = history;

    if (search) {
      filteredHistory = history.filter((item) =>
        item.medicineId?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    return responseHandler(
      res,
      200,
      "History retrieved successfully.",
      {
        history: filteredHistory,
      }
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