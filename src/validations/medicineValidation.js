const { body, validationResult } = require("express-validator");

const medicineValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Medicine name is required."),
    
    body("dosage")
        .trim()
        .notEmpty()
        .withMessage("Dosage is required."),

    body("type")
        .isIn([
            "capsule", 
            "tablet", 
            "cream", 
            "drops", 
            "syrup", 
            "injection", 
            "other"])
        .withMessage("Invalid medicine type."),
    
    body("description")
        .optional()
        .trim(),

    body("activeIngredient")
        .trim()
        .nonEmpty()
        .withMessage("Active ingredient is required"),

        (req, res, next) => {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }
            next();
        }
];

module.exports = medicineValidation;