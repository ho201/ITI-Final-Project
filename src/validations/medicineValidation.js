const { z } = require("zod");

const medicineValidation = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Medicine name is required."),

  dosage: z
    .string()
    .trim()
    .min(1, "Dosage is required."),

  type: z
    .enum([
      "capsule",
      "tablet",
      "cream",
      "drops",
      "syrup",
      "injection",
      "other"
    ], {
      message: "Invalid medicine type."
    }),

  description: z
    .string()
    .trim()
    .optional(),

  activeIngredient: z
    .string()
    .trim()
    .min(1, "Active ingredient is required"),
});

module.exports = medicineValidation;