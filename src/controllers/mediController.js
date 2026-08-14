const medicineService = require("../services/medicineService");
const responseHandler = require("../utils/responseHandler");

const createMedicine = async (req, res, next) => {
    try {
        const medicine = await medicineService.createMedicine({
            ...req.body,
            userId: req.user._id
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

const getMedicines = async (req, res, next) => {
    try {
        const result = await medicineService.getMedicines(req.user._id, req.query);

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

const getMedicineById = async (req, res, next) => {
    try {
        const medicine = await medicineService.getMedicineById(
            req.params.id,
            req.user._id
        );

        if (!medicine) {
            return responseHandler(res, 404, "Medicine not found");
        }

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

const updateMedicine = async (req, res, next) => {
    try {
        const medicine = await medicineService.updateMedicine(
            req.params.id,
            req.user._id,
            req.body
        );

        if (!medicine) {
            return responseHandler(res, 404, "Medicine not found");
        }

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

const deleteMedicine = async (req, res, next) => {
    try {
        const medicine = await medicineService.deleteMedicine(
            req.params.id,
            req.user._id
        );

        if (!medicine) {
            return responseHandler(res, 404, "Medicine not found");
        }

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