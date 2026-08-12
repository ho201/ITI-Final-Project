const { 
    createReminderService,
    getUserRemindersService, 
    updateReminderService, 
    deleteReminderService 
} = require('../services/reminderServices.js');
const responseHandler = require('../utils/responseHandler');

const createReminder = async (req, res, next) => {
    try {
    const newReminder = await createReminderService(req.user.id, req.body);
    return responseHandler(res, 201, 'Reminder created successfully', newReminder);
} catch (error) {
    next(error);
}
};

const getUserReminders = async (req, res, next) => {
    try {
    const reminders = await getUserRemindersService(req.user.id);
    return responseHandler(res, 200, 'Reminders fetched successfully', reminders);
} catch (error) {
    next(error);
}
};

const updateReminder = async (req, res, next) => {
    try {
    const updatedReminder = await updateReminderService(req.params.id, req.user.id, req.body);
    return responseHandler(res, 200, 'Reminder updated successfully', updatedReminder);
} catch (error) {
    next(error);
}
};

const deleteReminder = async (req, res, next) => {
    try {
    await deleteReminderService(req.params.id, req.user.id);
    return responseHandler(res, 200, 'Reminder deleted successfully');
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