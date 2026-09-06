
const responseHandler = require("../utils/responseHandler");
const historyService = require("../services/historyService");

// Create history
const createHistory = async (req, res, next) => {
    try {
        const {
            medicineId,
            reminderId,
            status,
            takenAt
        } = req.body;

        const historyData = {
            medicineId,
            reminderId,
            status,
            takenAt
        };

        const history = await historyService.createHistory(
            req.user._id,
            historyData
        );

        return responseHandler(
            res,
            201,
            "History created successfully.",
            { history }
        );

    } catch (err) {
        next(err);
    }
};


// Get history
const getHistory = async (req, res, next) => {
    try {
        const {
            status,
            medicineId,
            search
        } = req.query;

        const filters = {
            status,
            medicineId,
            search
        };

        const history = await historyService.getHistory(
            req.user._id,
            filters
        );

        return responseHandler(
            res,
            200,
            "History retrieved successfully.",
            { history }
        );

    } catch (err) {
        next(err);
    }
};


// Update history
const updateHistory = async (req, res, next) => {
    try {
        // Only status can be updated
        const { status } = req.body;

        const updateData = {
            status
        };

        const history = await historyService.updateHistory(
            req.params.id,
            req.user._id,
            updateData
        );

        return responseHandler(
            res,
            200,
            "History updated successfully.",
            { history }
        );

    } catch (err) {
        next(err);
    }
};


module.exports = {
    createHistory,
    getHistory,
    updateHistory
};

