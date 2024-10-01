import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const supplierSchema = mongoose.Schema(
  {
    // Basic Information
    supplierName: { type: String, required: true },
    supplierCode: { type: String, required: true, unique: true },
    supplierType: {
      type: String,
      enum: ["Raw Material", "Service Provider", "Equipment Supplier", "Other"],
      required: true,
    },

    // Contact Information
    contactPerson: { type: String, required: true },
    contactEmail: { type: String, required: true, unique: true },
    contactPhone: { type: String, required: true },
    companyWebsite: { type: String, default: "" },

    // Address Information
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    // Payment and Rating
    paymentTerms: {
      type: String,
      required: true,
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
      required: true,
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

// Pre-save the password

supplierSchema.pre("password", async (next) => {
  if (!this.modified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// supplierSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const supplierModel = mongoose.model("Supplier", supplierSchema);

export default supplierModel;
