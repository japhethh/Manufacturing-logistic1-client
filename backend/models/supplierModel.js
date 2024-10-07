// models/Supplier.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Counter from "./Counter.js"; // Import the Counter model

const supplierSchema = mongoose.Schema(
  {
    // Basic Information
    supplierName: {
      type: String,
      required: function () {
        return this.status === "Active";
      },
    },

    // New drop
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    supplierCode: {
      type: String,
      unique: true,
    },
    supplierType: {
      type: String,
      enum: ["Raw Material", "Service Provider", "Equipment Supplier", "Other"],
      // You can choose to require this based on status if needed
    },
    gender: { type: String },

    // Contact Information
    contactPerson: {
      type: String,
      required: function () {
        return this.status === "Active";
      },
    },
    contactEmail: {
      type: String,
      required: function () {
        return this.status === "Active";
      },
      unique: true,
    },
    contactPhone: {
      type: String,
      required: function () {
        return this.status === "Active";
      },
    },
    companyWebsite: { type: String, default: "" },

    // Address Information
    address: {
      street: {
        type: String,
        required: function () {
          return this.status === "Active";
        },
      },
      city: {
        type: String,
        required: function () {
          return this.status === "Active";
        },
      },
      state: {
        type: String,
        required: function () {
          return this.status === "Active";
        },
      },
      zipCode: {
        type: String,
        required: function () {
          return this.status === "Active";
        },
      },
      country: {
        type: String,
        required: function () {
          return this.status === "Active";
        },
      },
    },

    // Payment and Rating
    paymentTerms: {
      type: String,
      required: function () {
        return this.status === "Active";
      },
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },

    // Supplied Materials (Reference to Material Collection)
    materialSupplied: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
      },
    ],

    // Authentication
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      // Password only required when Active
    },

    // Email Verification
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },

    // Additional Fields for Small Businesses
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Active", "Inactive"],
      default: "Pending",
    },

    // Optional: Profile Image or Logo URL
    logo: { type: String, default: "" },
  },
  { timestamps: true }
);

supplierSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash password if modified and generate supplierCode if activating
supplierSchema.pre("save", async function (next) {
  // Hash password if modified
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }

  // Generate supplierCode if status is being set to Active and supplierCode is not set
  if (
    this.isModified("status") &&
    this.status === "Active" &&
    !this.supplierCode
  ) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "supplierCode" }, // Identifier for the supplierCode counter
        { $inc: { sequence_value: 1 } }, // Increment the sequence value by 1
        { new: true, upsert: true } // Return the updated document and create if it doesn't exist
      );

      const sequenceNumber = counter.sequence_value.toString().padStart(3, "0"); // e.g., 001
      this.supplierCode = `SC-${sequenceNumber}`;
    } catch (error) {
      return next(error);
    }
  }

  next();
});

const supplierModel = mongoose.model("Supplier", supplierSchema);

export default supplierModel;
