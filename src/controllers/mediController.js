const Medicine = require("../models/Medicine");
const responseHandler = require("../utils/responseHandler");

const createMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.create({
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
    } 
    catch (error) {
        next(error);
    }
};

const getMedicines = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search, type, status } = req.query;
        let dbQuery = { userId: req.user._id };

        if (search) {
            dbQuery.$or = [
                { name: { $regex: search, $options: "i" } },
                { activeIngredient: { $regex: search, $options: "i" } }
            ];
        }

        if (type) dbQuery.type = type;
        if (status) dbQuery.status = status;

        const parsedLimit = parseInt(limit);
        const skipAmount = (parseInt(page) - 1) * parsedLimit;

        const medicines = await Medicine.find(dbQuery)
            .skip(skipAmount)
            .limit(parsedLimit)
            .lean();

        const totalDocuments = await Medicine.countDocuments(dbQuery);

        const result = {
            count: medicines.length,
            total: totalDocuments,
            totalPages: Math.ceil(totalDocuments / parsedLimit),
            currentPage: parseInt(page),
            medicines
        };

        return responseHandler(
            res,
            200,
            "Medicines retrieved successfully",
            result
        );
    } 
    catch (error) {
        next(error);
    }
};

const getMedicineById = async (req, res, next) => {
    try {
        const medicine = await Medicine.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!medicine) {
            return responseHandler(res, 404, "Medicine not found");
        }

        return responseHandler(
            res,
            200,
            "Medicine retrieved successfully",
            { medicine }
        );
    } 
    catch (error) {
        next(error);
    }
};

const updateMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user._id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
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
    } 
    catch (error) {
        next(error);
    }
};

const deleteMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!medicine) {
            return responseHandler(res, 404, "Medicine not found");
        }

        return responseHandler(
            res,
            200,
            "Medicine deleted successfully"
        );
    } 
    catch (error) {
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