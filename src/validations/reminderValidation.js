// const { z } = require('zod');

// const createReminderSchema = z.object({
//     medicineId: z.string({
//     required_error: 'Medicine ID is required'
// }).regex(/^[0-9a-fA-F]{24}$/, 'Invalid Medicine ID format'),

// time: z.string({
//     required_error: 'Reminder time is required'
// }).min(1, 'Reminder time cannot be empty'),

// dosageQuantity: z.string({
//     required_error: 'Dosage quantity is required'
// }).min(1, 'Dosage quantity cannot be empty'),

// frequency: z.enum(['Daily', 'Weekly', 'Specific Days'], {
//     errorMap: () => ({ message: 'Invalid frequency value. Must be Daily, Weekly, or Specific Days' })
// }),

// days: z.array(
//     z.enum(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
// ).optional()
// }).refine((data) => {

//     if (data.frequency === 'Specific Days') {
//     return data.days && data.days.length > 0;
// }
// return true;
// }, {
//     message: "Days are required when frequency is 'Specific Days'",
//     path: ['days'] 
// });

// module.exports = createReminderSchema;

const { z } = require("zod");

const createReminderSchema = z.object({
    medicineId: z.string().regex(
        /^[0-9a-fA-F]{24}$/,
        "Invalid Medicine ID format"
    ),

    time: z.string().regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Invalid time format. Use HH:MM"
    ),

    dosageQuantity: z.string().trim().min(
        1,
        "Dosage quantity cannot be empty"
    ),

    frequency: z.enum([
        "Daily",
        "Weekly",
        "Specific Days"
    ]),

    days: z.array(
        z.enum([
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ])
    ).optional()
});

const updateReminderSchema = z.object({
    medicineId: z.string().regex(
        /^[0-9a-fA-F]{24}$/,
        "Invalid Medicine ID format"
    ).optional(),

    time: z.string().regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Invalid time format. Use HH:MM"
    ),

    dosageQuantity: z.string().trim().min(
        1,
        "Dosage quantity cannot be empty"
    ),

    frequency: z.enum([
        "Daily",
        "Weekly",
        "Specific Days"
    ]).optional(),

    days: z.array(
        z.enum([
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ])
    ).optional(),

    isActive: z.boolean().optional()
});

module.exports = {
    createReminderSchema,
    updateReminderSchema
};





