// models/Supplier.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Counter from "./Counter.js"; // Import the Counter model
import validate from "validator";
const supplierSchema = mongoose.Schema(
  {
    // Basic Information
    supplierName: {
      type: String,
      required: function () {
        return this.status === "Active";
      },
      type: String,
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters."], 
    },

    // New drop
    firstName: {
      type: String,
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters."],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters."],
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
    gender: { type: String, enum: ["male", "female", "other"] },

    // Contact Information
    contactPerson: {
      type: String,
      required: function () {
        return this.status === "Active";
      },
      trim: true,
      maxlength: [100, "Contact person name cannot exceed 100 characters."],
    },
    contactEmail: {
      type: String,
      required: function () {
        return this.status === "Active";
      },
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validate.isEmail, "Please provide a valid email address."],
    },
    contactPhone: {
      type: String,
      required: function () {
        return this.status === "Active";
      },
    },
    companyWebsite: { type: String, default: "", trim: true },

    // Address Information
    address: {
      street: {
        type: String,
        required: function () {
          return this.status === "Active";
        },
        trim: true,
        maxlength: [200, "Street address cannot exceed 200 characters."],
      },
      city: {
        type: String,
        required: function () {
          return this.status === "Active";
        },
        trim: true,
        maxlength: [100, "City name cannot exceed 100 characters."],
      },
      state: {
        type: String,
        required: function () {
          return this.status === "Active";
        },
        trim: true,
        maxlength: [100, "State name cannot exceed 100 characters."],
      },
      zipCode: {
        type: String,
        required: function () {
          return this.status === "Active";
        },
        trim: true,
        maxlength: [20, "Zip code cannot exceed 20 characters."],
      },
      country: {
        type: String,
        required: function () {
          return this.status === "Active";
        },
        trim: true,
        maxlength: [100, "Country name cannot exceed 100 characters."],
      },
      address: {
        type: String,
        trim: true,
        // required: function () {
        //   return this.status === "Active";
        // },
      },
    },

    // Payment and Rating
    paymentTerms: {
      type: String,
      required: function () {
        return this.status === "Active";
      },
      trim: true,
      maxlength: [50, "Payment terms cannot exceed 50 characters."],
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1."],
      max: [5, "Rating cannot exceed 5."],
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
      trim: true,
      validate: [validate.isEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      // minlength: [6, "Password must be at least 6 characters."],
      // Password only required when Active
    },

    purchaseOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PurchaseOrder",
      },
    ],
    // Email Verification
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },

    // Additional Fields for Small Businesses
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Active", "Deactivated"],
      default: "Pending",
    },
    // Optional: Profile Image or Logo URL
    logo: { type: String, default: "" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  },
  { timestamps: true }
);

supplierSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash password if modified and generate supplierCode if activating
supplierSchema.pre("save", async function (next) {
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
