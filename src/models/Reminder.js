const mongoose = require('mongoose');
const reminderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true,'user is required'],
    },
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: [true, 'medicine is required']
    },
    time: {
        type: String, 
        required: [true, 'time is required']
    },
    frequency: {
        type: String,
        enum: ['Daily', 'Weekly', 'Specific Days'],
        default: 'Daily'
    },
    days: {
        type: [String], 
        enum: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        required: function() {
        return this.frequency === 'Specific Days';
    }
    },
    dosage: {
        quantity: {
            type: Number,
            required: [true, 'Dosage quantity is required'],
            min: [0.1, 'Quantity must be greater than 0']
        },
        unit: {
            type: String,
            required: [true, 'Dosage unit is required'],
            enum: ['tablets', 'capsules', 'ml', 'mg', 'drops', 'puffs']
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
);

reminderSchema.index({ userId: 1 });
reminderSchema.index({ userId: 1, medicineId: 1, time: 1 });

const Reminder = mongoose.model("Reminder", reminderSchema);
module.exports = Reminder;