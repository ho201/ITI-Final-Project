const responseHandler = require("../utils/responseHandler");
const medicineService = require("../services/medicineService");

// Create medicine
const createMedicine = async (req, res, next) => {
    try {

        const medicine = await medicineService.createMedicine({
            ...req.body,
            userId: req.user._id,
            image: req.file ? req.file.path : null
        });

        return responseHandler(
            res,
            201,
            "Medicine created successfully",
            { medicine }
        );

    } catch (error) {
        next(error);
    }
};

// Get medicines
const getMedicines = async (req, res, next) => {
    try {

        const result =
            await medicineService.getMedicines(
                req.user._id,
                req.query
            );

        return responseHandler(
            res,
            200,
            "Medicines retrieved successfully",
            result
        );

    } catch (error) {
        next(error);
    }
};

// Get medicine by ID
const getMedicineById = async (req, res, next) => {
    try {

        const medicine =
            await medicineService.getMedicineById(
                req.params.id,
                req.user._id
            );

        return responseHandler(
            res,
            200,
            "Medicine retrieved successfully",
            { medicine }
        );

    } catch (error) {
        next(error);
    }
};

// Update medicine
const updateMedicine = async (req, res, next) => {
    try {

        const medicine =
            await medicineService.updateMedicine(
                req.params.id,
                req.user._id,
                req.body
            );

        return responseHandler(
            res,
            200,
            "Medicine updated successfully",
            { medicine }
        );

    } catch (error) {
        next(error);
    }
};

// Delete medicine
const deleteMedicine = async (req, res, next) => {
    try {

        await medicineService.deleteMedicine(
            req.params.id,
            req.user._id
        );

        return responseHandler(
            res,
            200,
            "Medicine deleted successfully"
        );

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMedicine,
    getMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine
};