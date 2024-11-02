import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the user schema
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userName: { type: String },
    password: { type: String },
    phone: { type: String },
    date: { type: Date },
    address: { type: String },
    city: { type: String },
    image: { type: String },
    role: {
      type: String,
      enum: [
        "admin",
        "logistic",
        "user",
        "pending",
        "vendorAdmin",
        "qualityControl",
      ],
      default: "pending",
    },
    generalSetting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneralSettings",
    },
  },
  { timestamps: true }
);

// Method for comparing passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook for hashing the password during user registration
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Ensure to call next() after the hash process
});

// Create the User model
const userModel = mongoose.model("User", userSchema);

export default userModel;
