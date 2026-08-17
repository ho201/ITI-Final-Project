
const mongoose = require("mongoose");
// يعني بدل ما نتعامل مع MongoDB بشكل مباشر، بنستخدم Mongoose كـ layer بين الـ Node.js والـ MongoDB.

const config = require("./config");

const connectDB = async () => {
    try {
        await mongoose.connect(config.database.uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);//دي بتوقف الـ Node.js process.
        // Database connection failed → stop the application
    }
};

module.exports = connectDB;