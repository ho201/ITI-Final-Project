const mongoose = require("mongoose");

const medecineSchema = new mongooseSchema({
    userId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
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

    image:{
        type: String
    },

    description:{
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
    }
);

const Medicine = mongoose.model("Medicine", medecineSchema);

module.exports = Medicine;

