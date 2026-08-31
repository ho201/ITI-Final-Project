const responseHandler = require("../utils/responseHandler");
const authService = require("../services/authService");

// Register
const register = async (req, res, next) => {
    try {

        const user = await authService.registerUser(req.body);

        return responseHandler(
            res,
            201,
            "User registered successfully.",
            { user }
        );

    } catch (err) {
        next(err);
    }
};

// Login
const login = async (req, res, next) => {
    try {

        const result = await authService.loginUser(req.body);

        return responseHandler(
            res,
            200,
            "Login successful.",
            result
        );

    } catch (err) {
        next(err);
    }
};

// Get profile
const profile = async (req, res, next) => {
    try {

        const user = authService.getProfile(req.user);

        return responseHandler(
            res,
            200,
            "User profile",
            { user }
        );

    } catch (err) {
        next(err);
    }
};

// Get all users
const getAllUsers = async (req, res, next) => {
    try {

        const users = await authService.getAllUsers();

        return responseHandler(
            res,
            200,
            "Users retrieved successfully.",
            { users }
        );

    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
    login,
    profile,
    getAllUsers
};