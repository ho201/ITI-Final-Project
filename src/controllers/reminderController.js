const Reminder = require('../models/Reminder.js');
const responseHandler = require('../utils/responseHandler.js');


const createReminder = async (req, res, next) => {
    try {
    const { medicineId, time, frequency, dosageQuantity, days } = req.body;
    const userId = req.user.id;
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
        medicineId,
        time,
        frequency,
        dosageQuantity,
        days: frequency === 'Specific Days' ? days : []
    });

    await newReminder.save();

    return responseHandler(res, 201, 'Reminder created successfully', newReminder);
} catch (error) {
    next(error);
}
};


const getUserReminders = async (req, res, next) => {
    try {
    const reminders = await Reminder.find({ userId: req.user.id })
    .populate('medicineId', 'name dosage image');

    return responseHandler(res, 200, 'Reminders fetched successfully', reminders);
} catch (error) {
    next(error);
}
};


const updateReminder = async (req, res, next) => {
    try {
    const reminderId = req.params.id;
    const { time, frequency, dosageQuantity, days, isActive } = req.body;
    const userId = req.user.id;

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

    if (time) reminder.time = time;
    if (frequency) reminder.frequency = frequency;
    if (dosageQuantity) reminder.dosageQuantity = dosageQuantity;
    if (days) reminder.days = frequency === 'Specific Days' ? days : [];
    if (typeof isActive === 'boolean') reminder.isActive = isActive;

    await reminder.save();

    return responseHandler(res, 200, 'Reminder updated successfully', reminder);
}   catch (error) {
    next(error);
}
};

const deleteReminder = async (req, res, next) => {
    try {
    const reminderId = req.params.id;
    const reminder = await Reminder.findById(reminderId);

    if (!reminder) {
        const err = new Error('Reminder not found');
        err.statusCode = 404;
        throw err;
    }

    if (reminder.userId.toString() !== req.user.id) {
        const err = new Error('Unauthorized to delete this reminder');
        err.statusCode = 403;
        throw err;
    }

    await reminder.deleteOne();

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