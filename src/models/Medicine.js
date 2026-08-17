const mongoose = require("mongoose");

const medecineSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true 
    },
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    dosage: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["capsule", "tablet", "cream", "drops", "syrup", "injection", "other"],
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed", "suspended"],
        default: "active",
        index: true 
    },
    image: {
        type: String
    },
    description: {
        type: String,
        trim: true
    },
    activeIngredient: {
        type: String,
        required: true,
        trim: true,
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model("Medicine", medecineSchema);