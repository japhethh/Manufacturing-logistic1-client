import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true },
    phone:{type:String},
    date:{type:String},
    address:{type:String},
    city:{type:String},
    // pic: { type: String, required: true },
    pic: { type: String },
    role: { type: String,enum:['admin','employee'], default:'employee' },
  },
  { timestamps: true }
);

// For login Purposes checking the password match in bcrypt password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Register purposes
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
