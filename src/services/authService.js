const User = require("../models/User");
const { generateToken } = require("../config/jwt");

// Register a new user
const registerUser = async ({ name, email, password }) => {

    // Check if email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("Email is already registered.");
        error.statusCode = 409;
        throw error;
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};


// Login user
const loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        const error = new Error("Invalid email or password.");
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        const error = new Error("Invalid email or password.");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken({
        id: user._id,
        role: user.role
    });

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};


// Get current user profile
const getProfile = (user) => {

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };
};


// Get all users
const getAllUsers = async () => {

    const users = await User.find().select("-password");

    return users;
};


module.exports = {
    registerUser,
    loginUser,
    getProfile,
    getAllUsers
};