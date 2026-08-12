const Medicine = require("../models/Medicine");

const createMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.create({
            ...req.body,
            userId: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Medicine created successfully",
            data: medicine
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getMedicines = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search, type, status } = req.query;

        // base query to filter medicines by userId
        let dbQuery = { userId: req.user.id };

        //search for name or activeingredient
        if (search) {
            dbQuery.$or = [
                { name: { $regex: search, $options: "i" } },
                { activeIngredient: { $regex: search, $options: "i" } }
            ];
        }

        // adding type and status filters if provided
        if (type) dbQuery.type = type;
        if (status) dbQuery.status = status;

        // Pagination Math
        const parsedLimit = parseInt(limit);
        const skipAmount = (parseInt(page) - 1) * parsedLimit;

        // optimized query with lean() for better performance
        const medicines = await Medicine.find(dbQuery)
            .skip(skipAmount)
            .limit(parsedLimit)
            .lean(); 

        const totalDocuments = await Medicine.countDocuments(dbQuery);

        res.status(200).json({
            success: true,
            count: medicines.length,
            total: totalDocuments,
            totalPages: Math.ceil(totalDocuments / parsedLimit),
            currentPage: parseInt(page),
            data: medicines
        });
    } catch (error) {
        next(error); 
    }
};

const getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: "Medicine not found"
            });
        }

        res.status(200).json({
            success: true,
            data: medicine
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: "Medicine not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Medicine updated successfully",
            data: medicine
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: "Medicine not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createMedicine,
    getMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine
};