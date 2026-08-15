const User = require("../models/User");
const { generateToken } = require("../config/jwt");
const responseHandler = require("../utils/responseHandler");


const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return responseHandler(res, 409, "Email is already registered.");
    }

    const user = await User.create({ name, email, password });

    return responseHandler(res, 201, "User registered successfully.", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return responseHandler(res, 401, "Invalid email or password.");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return responseHandler(res, 401, "Invalid email or password.");
    }

    const token = generateToken({ id: user._id, role: user.role });

    return responseHandler(res, 200, "Login successful.", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

const profile = async (req, res, next) => {
  try {
    return responseHandler(res, 200, "User profile", {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        createdAt: req.user.createdAt,
      },
    });
  } 
  catch (err) {
    next(err);
  }
}
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    return responseHandler(res, 200, "Users retrieved successfully.", {
      users,
    });
  } 
  catch (err) {
    next(err);
  }

};

module.exports = { register, login, profile, getAllUsers};
