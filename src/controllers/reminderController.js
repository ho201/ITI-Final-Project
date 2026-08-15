const Reminder = require("../models/Reminder.js");
const responseHandler = require("../utils/responseHandler");

const createReminder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const reminderData = req.body;

        const { medicineId, time, frequency } = reminderData;

        const existingReminder = await Reminder.findOne({
            userId,
            medicineId,
            time,
            frequency
        });

        if (existingReminder) {
            const err = new Error(
                "A reminder for this medicine at this exact time already exists."
            );
            err.statusCode = 400;
            throw err;
        }

        const newReminder = new Reminder({
            userId,
            ...reminderData,
            days: frequency === "Specific Days" ? reminderData.days : []
        });

        await newReminder.save();

        return responseHandler(
            res,
            201,
            "Reminder created successfully",
            newReminder
        );
    } catch (error) {
        next(error);
    }
};

const getUserReminders = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const reminders = await Reminder.find({ userId })
            .populate("medicineId", "name dosage image");

        return responseHandler(
            res,
            200,
            "Reminders fetched successfully",
            reminders
        );
    } catch (error) {
        next(error);
    }
};

const updateReminder = async (req, res, next) => {
    try {
        const reminderId = req.params.id;
        const userId = req.user.id;
        const updateData = req.body;

        const reminder = await Reminder.findById(reminderId);

        if (!reminder) {
            const err = new Error("Reminder not found");
            err.statusCode = 404;
            throw err;
        }

        if (reminder.userId.toString() !== userId) {
            const err = new Error("Unauthorized to update this reminder");
            err.statusCode = 403;
            throw err;
        }

        if (updateData.time) reminder.time = updateData.time;
        if (updateData.frequency) reminder.frequency = updateData.frequency;
        if (updateData.dosageQuantity)
            reminder.dosageQuantity = updateData.dosageQuantity;

        if (updateData.days)
            reminder.days =
                updateData.frequency === "Specific Days"
                    ? updateData.days
                    : [];

        if (typeof updateData.isActive === "boolean")
            reminder.isActive = updateData.isActive;

        await reminder.save();

        return responseHandler(
            res,
            200,
            "Reminder updated successfully",
            reminder
        );
    } catch (error) {
        next(error);
    }
};

const deleteReminder = async (req, res, next) => {
    try {
        const reminderId = req.params.id;
        const userId = req.user.id;

        const reminder = await Reminder.findById(reminderId);

        if (!reminder) {
            const err = new Error("Reminder not found");
            err.statusCode = 404;
            throw err;
        }

        if (reminder.userId.toString() !== userId) {
            const err = new Error("Unauthorized to delete this reminder");
            err.statusCode = 403;
            throw err;
        }

        await reminder.deleteOne();

        return responseHandler(
            res,
            200,
            "Reminder deleted successfully"
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createReminder,
    getUserReminders,
    updateReminder,
    deleteReminder
};