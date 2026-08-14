const Medicine = require("../models/Medicine");

const createMedicine = async (data) => {
    return await Medicine.create(data);
};

const getMedicines = async (userId, query) => {
    const { page = 1, limit = 10, search, type, status } = query;
    let dbQuery = { userId };

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

    return {
        count: medicines.length,
        total: totalDocuments,
        totalPages: Math.ceil(totalDocuments / parsedLimit),
        currentPage: parseInt(page),
        medicines 
    };
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