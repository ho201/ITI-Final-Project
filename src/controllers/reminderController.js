const Reminder = require("../models/Reminder.js");
const Medicine = require("../models/Medicine.js");
const responseHandler = require("../utils/responseHandler.js");

const createReminder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { medicineId, time } = req.body;

        const medicine = await Medicine.findOne({
            _id: medicineId,
            userId
        });

        if (!medicine) {
            const error = new Error("Medicine not found or unauthorized.");
            error.statusCode = 404;
            throw error;
        }

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

        const newReminder = new Reminder({
            userId,
            ...req.body,
            days:
                req.body.frequency === "Specific Days"
                    ? req.body.days
                    : undefined
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
        const { search, frequency, isActive, medicineId } = req.query;

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

        let filteredReminders = reminders;

        if (search) {
            filteredReminders = reminders.filter((reminder) =>
                reminder.medicineId?.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        return responseHandler(
            res,
            200,
            "Reminders fetched successfully",
            filteredReminders
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

        if (updateData.frequency) {
            reminder.frequency = updateData.frequency;

            if (updateData.frequency === "Specific Days") {
                if (!updateData.days || updateData.days.length === 0) {
                    const err = new Error(
                        "Days are required when frequency is Specific Days"
                    );
                    err.statusCode = 400;
                    throw err;
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
            if (updateData.dosage.quantity !== undefined)
                reminder.dosage.quantity = updateData.dosage.quantity;

            if (updateData.dosage.unit !== undefined)
                reminder.dosage.unit = updateData.dosage.unit;
        }

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