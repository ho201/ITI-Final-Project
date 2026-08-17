const mongoose = require("mongoose");

const medecineSchema = new mongoose.Schema({
    userId: {//معناه إن كل دواء مرتبط بمستخدم معين.
        type: mongoose.Schema.Types.ObjectId,//ده نوع الـ ID بتاع MongoDB.
        // فالمستخدم ده يشوف أدويته هو فقط.
        ref: "User",
        required: true,//يعني مينفعش نعمل Medicine من غير User.
        index: true //بيعمل Index على userId، وده بيساعد MongoDB لما نبحث عن أدوية مستخدم معين.
    },
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    dosage: {//جرعة الدواء.
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["capsule", "tablet", "cream", "drops", "syrup", "injection", "other"],// النوع لازم يكون يكون واحد من دول
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed", "suspended"],
// active = الدواء نشط / المستخدم لسه بياخده.
// completed = خلصت فترة الدواء أو المستخدم أنهى الجرعة/العلاج.
// suspended = الدواء متوقف مؤقتًا، يعني المستخدم كان بياخده لكن وقفه حاليًا.


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
    activeIngredient: {//المادة الفعالة في الدواء.
        type: String,
        required: true,//وهي required لأن المشروع محتاجها في البحث والفلترة.
        trim: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Medicine", medecineSchema);