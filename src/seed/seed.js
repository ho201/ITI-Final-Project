require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../models/User");
const Medicine = require("../models/Medicine");
const Reminder = require("../models/Reminder");
const History = require("../models/History");

const connectDB = require("../config/db");

const seedData = async () => {
    try {
        await connectDB();

        // Clear old seed data
        await History.deleteMany({});
        await Reminder.deleteMany({});
        await Medicine.deleteMany({});
        await User.deleteMany({});

        // Create User
        const user = await User.create({
            name: "Test User",
            email: "test@example.com",
            password: "123456",
            role: "user"
        });

        // Create Medicine
        const medicine = await Medicine.create({
            userId: user._id,
            name: "Panadol",
            dosage: "500 mg",
            type: "tablet",
            status: "active",
            description: "Pain relief medicine",
            activeIngredient: "Paracetamol"
        });

        // Create Reminder
    const reminder = await Reminder.create({
    userId: user._id,
    medicineId: medicine._id,
    time: "08:00",
    frequency: "Daily",
    days: [],
    dosage: {
        quantity: 1,
        unit: "tablets"
    },
    isActive: true
});

        //  Create History
        await History.create({
            userId: user._id,
            medicineId: medicine._id,
            reminderId: reminder._id,
            status: "Taken",
            takenAt: new Date()
        });

        console.log("✅ Seed data inserted successfully");

        process.exit(0);

    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
};

seedData();