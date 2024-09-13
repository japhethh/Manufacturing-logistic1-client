import mongoose from "mongoose";

const supplierSchema = mongoose.Schema({
  supplierName: { type: String, required: true },
  supplierCode: { type: String, required: true },
  contactPerson: { type: String, required: true },
  contactEmail: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
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
  materialSupplied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const supplierModel = mongoose.model("Supplier", supplierSchema);

export default supplierModel;
