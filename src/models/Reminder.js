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
    dosageQuantity: {
        type: String,
        required: [true, 'dosage quantity is required'] 
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

const Reminder = mongoose.model("Reminder",userSchema);
module.exports = Reminder;