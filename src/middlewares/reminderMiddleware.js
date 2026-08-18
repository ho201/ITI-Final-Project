const {
    createReminderSchema,
    updateReminderSchema
} = require("../validations/reminderValidationز.js");

const responseHandler = require("../utils/responseHandler.js");

const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            const errorMessages = error.errors.map(err => err.message);
            return responseHandler(res, 400, 'Validation Error', errorMessages);
        }
    };
};

module.exports = {
    validateCreate: validateSchema(createReminderSchema),
    validateUpdate: validateSchema(updateReminderSchema)
};