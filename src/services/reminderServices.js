const Reminder = require('../models/Reminder.js');

const createReminderService = async (userId, reminderData) => {
    const { medicineId, time, frequency } = reminderData;

    const existingReminder = await Reminder.findOne({
    userId,
    medicineId,
    time,
    frequency
});

if (existingReminder) {
    const err = new Error('A reminder for this medicine at this exact time already exists.');
    err.statusCode = 400;
    throw err;
}

const newReminder = new Reminder({
    userId,
    ...reminderData,
    days: frequency === 'Specific Days' ? reminderData.days : []
});

await newReminder.save();
return newReminder;
};

const getUserRemindersService = async (userId) => {
    const reminders = await Reminder.find({ userId })
    .populate('medicineId', 'name dosage image');
    return reminders;
};

const updateReminderService = async (reminderId, userId, updateData) => {
    const reminder = await Reminder.findById(reminderId);

    if (!reminder) {
    const err = new Error('Reminder not found');
    err.statusCode = 404;
    throw err;
}

if (reminder.userId.toString() !== userId) {
    const err = new Error('Unauthorized to update this reminder');
    err.statusCode = 403;
    throw err;
}

if (updateData.time) reminder.time = updateData.time;
if (updateData.frequency) reminder.frequency = updateData.frequency;
if (updateData.dosageQuantity) reminder.dosageQuantity = updateData.dosageQuantity;
if (updateData.days) reminder.days = updateData.frequency === 'Specific Days' ? updateData.days : [];

if (typeof updateData.isActive === 'boolean') reminder.isActive = updateData.isActive;

await reminder.save();
return reminder;
};

const deleteReminderService = async (reminderId, userId) => {
    const reminder = await Reminder.findById(reminderId);

    if (!reminder) {
    const err = new Error('Reminder not found');
    err.statusCode = 404;
    throw err;
}

if (reminder.userId.toString() !== userId) {
    const err = new Error('Unauthorized to delete this reminder');
    err.statusCode = 403;
    throw err;
}

await reminder.deleteOne();
return true;
};

module.exports = {
    createReminderService,
    getUserRemindersService,
    updateReminderService,
    deleteReminderService
};