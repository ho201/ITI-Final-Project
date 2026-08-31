const responseHandler = require("../utils/responseHandler");
const reminderService = require("../services/reminderService");

// Create reminder
const createReminder = async (req, res, next) => {
    try {

        const reminder =
            await reminderService.createReminder(
                req.user.id,
                req.body
            );

        return responseHandler(
            res,
            201,
            "Reminder created successfully",
            reminder
        );

    } catch (error) {
        next(error);
    }
};

// Get user reminders
const getUserReminders = async (req, res, next) => {
    try {

        const reminders =
            await reminderService.getUserReminders(
                req.user.id,
                req.query
            );

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

// Update reminder
const updateReminder = async (req, res, next) => {
    try {

        const reminder =
            await reminderService.updateReminder(
                req.params.id,
                req.user.id,
                req.body
            );

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

// Delete reminder
const deleteReminder = async (req, res, next) => {
    try {

        await reminderService.deleteReminder(
            req.params.id,
            req.user.id
        );

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