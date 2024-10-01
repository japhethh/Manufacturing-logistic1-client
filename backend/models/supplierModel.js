import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const supplierSchema = mongoose.Schema(
  {
    // Basic Information
    supplierName: {
      type: String,
      required: function () {
        return this.status === "Active";
      },
    },
    supplierCode: {
      type: String,
      required: function () {
        return this.status === "Active";
      },
      unique: true,
    },
    supplierType: {
      type: String,
      enum: ["Raw Material", "Service Provider", "Equipment Supplier", "Other"],
      required: function () {
        return this.status === "Active";
      },
    },

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
      required: function () {
        return this.status === "Active";
      }, // Password only required when Active
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

// Pre-save hook to hash password if modified
supplierSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const supplierModel = mongoose.model("Supplier", supplierSchema);

export default supplierModel;
