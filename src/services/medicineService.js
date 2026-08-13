const Medicine = require("../models/Medicine");

const createMedicine = async (data) => {
    return await Medicine.create(data);
};

const getMedicines = async (userId) => {
    return await Medicine.find({ userId });
};

const getMedicineById = async (id, userId) => {
    return await Medicine.findOne({ _id: id, userId });
};

const updateMedicine = async (id, userId, data) => {
    return await Medicine.findOneAndUpdate(
        { _id: id, userId },
        data,
        { new: true, runValidators: true }
    );
};

const deleteMedicine = async (id, userId) => {
    return await Medicine.findOneAndDelete({
        _id: id,
        userId
    });
};

module.exports = {
    createMedicine,
    getMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine
};