const History = require("../models/History");
const Medicine = require("../models/Medicine");
const Reminder = require("../models/Reminder");

// Create history
const createHistory = async (userId, data) => {

    const {
        medicineId,
        reminderId,
        status,
        takenAt
    } = data;

    // Check medicine
    const medicine =
        await Medicine.findById(medicineId);

    if (!medicine) {
        const error = new Error("Medicine not found.");
        error.statusCode = 404;
        throw error;
    }

    // Check reminder
    const reminder =
        await Reminder.findById(reminderId);

    if (!reminder) {
        const error = new Error("Reminder not found.");
        error.statusCode = 404;
        throw error;
    }

    // Make sure reminder belongs to medicine
    if (
        reminder.medicineId.toString() !==
        medicineId.toString()
    ) {
        const error = new Error(
            "Reminder does not belong to this medicine."
        );
        error.statusCode = 400;
        throw error;
    }

    const history = await History.create({
        userId,
        medicineId,
        reminderId,
        status,
        takenAt
    });

    return history;
};

// Get history
const getHistory = async (userId, query) => {

    const {
        status,
        medicineId,
        search
    } = query;

    const filter = {
        userId
    };

    if (status) {
        filter.status = status;
    }

    if (medicineId) {
        filter.medicineId = medicineId;
    }

    const history = await History.find(filter)
        .populate("medicineId")
        .populate("reminderId")
        .sort({ createdAt: -1 });

    if (!search) {
        return history;
    }

    return history.filter((item) =>
        item.medicineId?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );
};

// Update history
const updateHistory = async (
    historyId,
    userId,
    updateData
) => {

    const history =
        await History.findOneAndUpdate(
            {
                _id: historyId,
                userId
            },
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

    if (!history) {
        const error = new Error(
            "History record not found."
        );
        error.statusCode = 404;
        throw error;
    }

    return history;
};

module.exports = {
    createHistory,
    getHistory,
    updateHistory
};