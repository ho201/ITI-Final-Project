const mongoose = require("mongoose");

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


    // Check valid IDs
    if (
        !mongoose.isValidObjectId(medicineId) ||
        !mongoose.isValidObjectId(reminderId)
    ) {
        const error = new Error("Invalid medicine or reminder ID.");
        error.statusCode = 400;
        throw error;
    }


    // Check medicine belongs to user
    const medicine = await Medicine.findOne({
        _id: medicineId,
        userId
    });

    if (!medicine) {
        const error = new Error("Medicine not found.");
        error.statusCode = 404;
        throw error;
    }


    // Check reminder belongs to user
    const reminder = await Reminder.findOne({
        _id: reminderId,
        userId
    });

    if (!reminder) {
        const error = new Error("Reminder not found.");
        error.statusCode = 404;
        throw error;
    }


    // Make sure reminder belongs to this medicine
    if (
        reminder.medicineId.toString() !==
        medicine._id.toString()
    ) {
        const error = new Error(
            "Reminder does not belong to this medicine."
        );

        error.statusCode = 400;
        throw error;
    }


    // Create history
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


    // Basic filter
    const filter = {
        userId
    };


    // Filter by status
    if (status) {
        if (!["Taken", "Missed"].includes(status)) {
            const error = new Error("Invalid status filter.");
            error.statusCode = 400;
            throw error;
        }

        filter.status = status;
    }


    // Filter by medicine
    if (medicineId) {

        if (!mongoose.isValidObjectId(medicineId)) {
            const error = new Error("Invalid medicine ID.");
            error.statusCode = 400;
            throw error;
        }

        filter.medicineId = medicineId;
    }


    // Get history
    let history = await History.find(filter)
        .populate("medicineId", "name")
        .populate("reminderId")
        .sort({ createdAt: -1 })
        .limit(100);


    // Simple search by medicine name
    if (search) {

        const searchText = search
            .trim()
            .toLowerCase();

        if (searchText.length > 50) {
            const error = new Error("Search text is too long.");
            error.statusCode = 400;
            throw error;
        }

        history = history.filter((item) =>
            item.medicineId?.name
                ?.toLowerCase()
                .includes(searchText)
        );
    }


    return history;
};



// Update history
const updateHistory = async (
    historyId,
    userId,
    updateData
) => {

    // Check valid history ID
    if (!mongoose.isValidObjectId(historyId)) {
        const error = new Error("Invalid history ID.");
        error.statusCode = 400;
        throw error;
    }


    // Only allow status update
    const allowedUpdates = {};

    if (updateData.status !== undefined) {

        if (!["Taken", "Missed"].includes(updateData.status)) {
            const error = new Error("Invalid history status.");
            error.statusCode = 400;
            throw error;
        }

        allowedUpdates.status = updateData.status;
    }


    // Make sure history belongs to user
    const history = await History.findOneAndUpdate(
        {
            _id: historyId,
            userId
        },
        {
            $set: allowedUpdates
        },
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

