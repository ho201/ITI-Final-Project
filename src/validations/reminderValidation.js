const { z } = require('zod');

const reminderBaseShape = {
    medicineId: z.string({
        required_error: 'Medicine ID is required'
    }).regex(/^[0-9a-fA-F]{24}$/, 'Invalid Medicine ID format'),

    time: z.string({
        required_error: 'Reminder time is required'
    }).min(1, 'Reminder time cannot be empty')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format, use HH:mm'),

    dosage: z.object({
        quantity: z.number({
            required_error: 'Dosage quantity is required',
            invalid_type_error: 'Dosage quantity must be a number'
        }).positive('Quantity must be a positive number').min(0.1),
        
        unit: z.enum(['tablets', 'capsules', 'ml', 'mg', 'drops', 'puffs'], {
            errorMap: () => ({ message: 'Invalid dosage unit' })
        })
    }),

    frequency: z.enum(['Daily', 'Weekly', 'Specific Days'], {
        errorMap: () => ({ message: 'Invalid frequency value. Must be Daily, Weekly, or Specific Days' })
    }),

    days: z.array(
        z.enum(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    ).optional(),

    isActive: z.boolean().optional()
};

const createReminderSchema = z.object(reminderBaseShape).refine((data) => {
    if (data.frequency === 'Specific Days') {
        return data.days && data.days.length > 0;
    }
    return true;
}, {
    message: "Days are required when frequency is 'Specific Days'",
    path: ['days']
});

const updateReminderSchema = z.object(reminderBaseShape).partial();

module.exports = {
    createReminderSchema,
    updateReminderSchema
};