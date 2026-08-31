const Reminder = require("../models/Reminder");
const Medicine = require("../models/Medicine");

// Create reminder
const createReminder = async (userId, data) => {

    const { medicineId, time } = data;

    // Make sure medicine belongs to the user
    const medicine = await Medicine.findOne({
        _id: medicineId,
        userId
    });

    if (!medicine) {
        const error = new Error(
            "Medicine not found or unauthorized."
        );
        error.statusCode = 404;
        throw error;
    }

    // Check duplicate reminder
    const existingReminder = await Reminder.findOne({
        userId,
        medicineId,
        time
    });

    if (existingReminder) {
        const error = new Error(
            "A reminder for this medicine at this time already exists."
        );
        error.statusCode = 400;
        throw error;
    }

    const reminder = new Reminder({
        userId,
        ...data,
        days:
            data.frequency === "Specific Days"
                ? data.days
                : undefined
    });

    await reminder.save();

    return reminder;
};

// Get user reminders
const getUserReminders = async (userId, query) => {

    const {
        search,
        frequency,
        isActive,
        medicineId
    } = query;

    const filter = {
        userId
    };

    if (frequency) {
        filter.frequency = frequency;
    }

    if (isActive !== undefined) {
        filter.isActive = isActive === "true";
    }

    if (medicineId) {
        filter.medicineId = medicineId;
    }

    const reminders = await Reminder.find(filter)
        .populate("medicineId", "name dosage image")
        .sort({ time: 1 });

    if (!search) {
        return reminders;
    }

    return reminders.filter((reminder) =>
        reminder.medicineId?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );
};

// Update reminder
const updateReminder = async (
    reminderId,
    userId,
    updateData
) => {

    const reminder =
        await Reminder.findById(reminderId);

    if (!reminder) {
        const error = new Error("Reminder not found");
        error.statusCode = 404;
        throw error;
    }

    if (reminder.userId.toString() !== userId.toString()) {
        const error = new Error(
            "Unauthorized to update this reminder"
        );
        error.statusCode = 403;
        throw error;
    }

    if (updateData.time) {
        reminder.time = updateData.time;
    }

    if (updateData.frequency) {

        reminder.frequency = updateData.frequency;

        if (updateData.frequency === "Specific Days") {

            if (
                !updateData.days ||
                updateData.days.length === 0
            ) {
                const error = new Error(
                    "Days are required when frequency is Specific Days"
                );
                error.statusCode = 400;
                throw error;
            }

            reminder.days = updateData.days;

        } else {
            reminder.days = undefined;
        }

    } else if (updateData.days) {

        if (reminder.frequency === "Specific Days") {
            reminder.days = updateData.days;
        }
    }

    if (updateData.dosage) {

        if (
            updateData.dosage.quantity !== undefined
        ) {
            reminder.dosage.quantity =
                updateData.dosage.quantity;
        }

        if (
            updateData.dosage.unit !== undefined
        ) {
            reminder.dosage.unit =
                updateData.dosage.unit;
        }
    }

    if (typeof updateData.isActive === "boolean") {
        reminder.isActive = updateData.isActive;
    }

    await reminder.save();

    return reminder;
};

// Delete reminder
const deleteReminder = async (
    reminderId,
    userId
) => {

    const reminder =
        await Reminder.findById(reminderId);

    if (!reminder) {
        const error = new Error("Reminder not found");
        error.statusCode = 404;
        throw error;
    }

    if (reminder.userId.toString() !== userId.toString()) {
        const error = new Error(
            "Unauthorized to delete this reminder"
        );
        error.statusCode = 403;
        throw error;
    }

    await reminder.deleteOne();

    return reminder;
};

module.exports = {
    createReminder,
    getUserReminders,
    updateReminder,
    deleteReminder
};