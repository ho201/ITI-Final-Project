const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,//دي معناها إن الـ password مش هيرجع تلقائيًا مع Queries بتاعة User.
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
//     createdAt
//   updatedAt
  }
);

userSchema.pre("save", async function () {//قبل ما الـ User يتعمله Save في MongoDB، نفذ الكود ده.
  if (!this.isModified("password")) return;
// هنا this بتشير إلى الـ User document الحالي اللي بيتحفظ.

// لو الباسورد متغيرش، متعملوش Hash مرة تانية.

// ليه؟

// لأن لو عملنا Hash للـ hash نفسه كل مرة، هنبوظ الباسورد.

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;