import mongoose from "mongoose";

const generalSchema = mongoose.Schema(
  {
    companyName: { type: String },
    companyEmail: { type: String },
    companyPhone: { type: Number },
    defaultCurrency: { type: String },
    defaultCurrencyPosition: { type: String },
    notificationEmail: { type: String },
    companyAddress: { type: String },
    state: { type: String },
    // New
    country: { type: String },
    city: { type: String },
    zipCode: { type: String },
    logo: {
      type: String,
      default:
        "https://www.google.com/imgres?q=logo&imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F12%2F27%2F13%2F10%2Flogo-1933884_640.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Flogo%2F&docid=bVXxrJ-DMFgyIM&tbnid=LVMPUZbSetrPCM&vet=12ahUKEwi6p4aVhdqIAxXOxzgGHawXGPYQM3oECC8QAA..i&w=640&h=539&hcb=2&ved=2ahUKEwi6p4aVhdqIAxXOxzgGHawXGPYQM3oECC8QAA",
    },
  },
  { timestamps: true }
);

const generalSettingsModel = mongoose.model("GeneralSettings", generalSchema);

export default generalSettingsModel;
