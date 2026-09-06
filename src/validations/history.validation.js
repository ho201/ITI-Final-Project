const { z } = require("zod");

const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID");


// Create History
const createHistoryValidation = z.object({

  medicineId: objectId,

  reminderId: objectId,

  status: z
    .enum(["Taken", "Missed"]),

  takenAt: z
    .string()
    .datetime()
    .optional(),

});


// Update History
const updateHistoryValidation = z.object({

  status: z
    .enum(["Taken", "Missed"])
    .optional(),

  takenAt: z
    .string()
    .datetime()
    .optional(),

});


module.exports = {
  createHistoryValidation,
  updateHistoryValidation,
};