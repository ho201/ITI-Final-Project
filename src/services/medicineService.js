const Medicine = require("../models/Medicine");

// Create medicine
const createMedicine = async (data) => {

    const medicine = await Medicine.create(data);

    return medicine;
};

// Get medicines with search, filter and pagination
const getMedicines = async (userId, query) => {

    const {
        page = 1,
        limit = 10,
        search,
        type,
        status
    } = query;

    const dbQuery = {
        userId
    };

    // Search by medicine name or active ingredient
    if (search) {
        dbQuery.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                activeIngredient: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    // Filter by medicine type
    if (type) {
        dbQuery.type = type;
    }

    // Filter by medicine status
    if (status) {
        dbQuery.status = status;
    }

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);

    const skipAmount =
        (parsedPage - 1) * parsedLimit;

    const medicines = await Medicine.find(dbQuery)
        .skip(skipAmount)
        .limit(parsedLimit)
        .lean();

    const totalDocuments =
        await Medicine.countDocuments(dbQuery);

    return {
        count: medicines.length,
        total: totalDocuments,
        totalPages: Math.ceil(
            totalDocuments / parsedLimit
        ),
        currentPage: parsedPage,
        medicines
    };
};

// Get medicine by ID
const getMedicineById = async (medicineId, userId) => {

    const medicine = await Medicine.findOne({
        _id: medicineId,
        userId
    });

    if (!medicine) {
        const error = new Error("Medicine not found");
        error.statusCode = 404;
        throw error;
    }

    return medicine;
};

// Update medicine
const updateMedicine = async (
    medicineId,
    userId,
    updateData
) => {

    const medicine = await Medicine.findOneAndUpdate(
        {
            _id: medicineId,
            userId
        },
        updateData,
        {
            new: true,
            runValidators: true
        }
    );

    if (!medicine) {
        const error = new Error("Medicine not found");
        error.statusCode = 404;
        throw error;
    }

    return medicine;
};

// Delete medicine
const deleteMedicine = async (medicineId, userId) => {

    const medicine = await Medicine.findOneAndDelete({
        _id: medicineId,
        userId
    });

    if (!medicine) {
        const error = new Error("Medicine not found");
        error.statusCode = 404;
        throw error;
    }

    return medicine;
};

module.exports = {
    createMedicine,
    getMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine
};