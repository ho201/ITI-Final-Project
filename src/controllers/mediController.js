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

const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find({
            userId: req.user.id
        });

        res.status(200).json({
            success: true,
            count: medicines.length,
            data: medicines
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
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