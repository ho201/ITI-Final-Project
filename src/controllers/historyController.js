const responseHandler = require("../utils/responseHandler");
const historyService = require("../services/historyService");

// Create history
const createHistory = async (req, res, next) => {
    try {

        const history =
            await historyService.createHistory(
                req.user._id,
                req.body
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

        const history =
            await historyService.getHistory(
                req.user._id,
                req.query
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

        const history =
            await historyService.updateHistory(
                req.params.id,
                req.user._id,
                req.body
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