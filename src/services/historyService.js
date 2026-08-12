const History = require("../models/History");

const createHistory = async (data) => {
  const history = await History.create(data);

  return history;
};

const getHistory = async (userId) => {
  const history = await History.find({ userId })
    .populate("medicineId")
    .populate("reminderId")
    .sort({ createdAt: -1 });

  return history;
};

const updateHistory = async (historyId, userId, data) => {
  const history = await History.findOneAndUpdate(
    {
      _id: historyId,
      userId: userId,
    },
    data,
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

  return history;
};

module.exports = {
  createHistory,
  getHistory,
  updateHistory,
};