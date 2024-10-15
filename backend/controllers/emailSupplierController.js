import asyncHandler from "express-async-handler";
import supplierModel from "../models/supplierModel.js";
import crypto from "crypto";
import { transporter } from "../config/transporter.js";

// REGISTER
const registerSupplier = asyncHandler(async (req, res) => {
  const apiURL = "https://manufacturing-logistic1-client-vendor.onrender.com";
  // window.location.hostname === "localhost"
  //   ? "http://localhost:5174"
  //   : "https://logistic1.jjm-manufacturing.com";

  const { email, gender, supplierName, firstName, lastName, contactPhone } =
    req.body; // Capture email and gender

  if (
    (!email || !gender || !supplierName, !firstName, !lastName, !contactPhone)
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const existingSupplier = await supplierModel.findOne({ email });

  if (existingSupplier) {
    if (existingSupplier.status === "Active") {
      return res.status(400).json({ error: "Email already registered." });
    }

    // Check if the existing token is expired
    if (existingSupplier.verificationTokenExpires < Date.now()) {
      // Generate a new token
      const newVerificationToken = crypto.randomBytes(20).toString("hex");
      const newVerificationTokenExpires = Date.now() + 3600000; // 1 hour

      existingSupplier.verificationToken = newVerificationToken;
      existingSupplier.verificationTokenExpires = newVerificationTokenExpires;
      existingSupplier.status = "Pending"; // Ensure status is pending
      await existingSupplier.save();

      // Create a new verification URL with the new token
      const verificationUrl = `${apiURL}/verify?token=${newVerificationToken}&email=${encodeURIComponent(
        email
      )}`;

      const emailContent = `
        <html>
          <body>
            <h2>Welcome to Our Vendor Portal!</h2>
            <p>Dear Supplier,</p>
            <p>Thank you for your interest in registering with us.</p>
            <p>Please verify your account by clicking the link below:</p>
            <p><a href="${verificationUrl}">Complete Your Registration</a></p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Best regards,</p>
            <p>Your Name</p>
            <p><small>JJM MANUFACTURING</small></p>
          </body>
        </html>
      `;

      try {
        const info = await transporter.sendMail({
          from: `"JJM MANUFACTURING" <mtrcb32130@gmail.com>`, // Your sender email
          to: email,
          subject: "Welcome to Our Vendor Portal!",
          html: emailContent, // Send HTML email content
        });

        return res.status(200).json({
          message: "Verification email resent. Please check your inbox.",
        });
      } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }
    } else {
      // Token is still valid but email is already registered
      return res
        .status(400)
        .json({ error: "Email already registered and pending verification." });
    }
  }

  const verificationToken = crypto.randomBytes(20).toString("hex");
  const verificationTokenExpires = Date.now() + 3600000; // 1 hour

  // Create new supplier with pending status
  const newSupplier = new supplierModel({
    email,
    contactEmail: email,
    gender,
    supplierName,
    firstName,
    lastName,
    contactPhone,
    status: "Pending",
    verificationToken,
    verificationTokenExpires,
    // Add other necessary fields as required
  });

  await newSupplier.save();

  // Create a verification URL with the email as a query parameter
  const verificationUrl = `${apiURL}/verify?token=${verificationToken}&email=${encodeURIComponent(
    email
  )}`;

  const emailContent = `
    <html>
      <body>
        <h2>Welcome to Our Vendor Portal!</h2>
        <p>Dear Supplier,</p>
        <p>Thank you for your interest in registering with us.</p>
        <p>Please verify your account by clicking the link below:</p>
        <p><a href="${verificationUrl}">Complete Your Registration</a></p>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,</p>
        <p>Your Name</p>
        <p><small>JJM MANUFACTURING</small></p>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"JJM MANUFACTURING" <mtrcb32130@gmail.com>`, // Your sender email
      to: email,
      subject: "Welcome to Our Vendor Portal!",
      html: emailContent, // Send HTML email content
    });

    res.status(200).json({
      messageId: info.messageId,
      message: "Verification email sent.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const verifyRegisterFill = asyncHandler(async (req, res) => {
  const { email, token } = req.query;

  if (!email || !token) {
    return res
      .status(400)
      .json({ error: "Email and token are required for verification" });
  }

  // Find the supplier with the provided email and token
  const supplier = await supplierModel.findOne({
    email,
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() }, // Check if the token is still valid
  });

  if (!supplier) {
    return res
      .status(400)
      .json({ error: "Invalid or expired verification token" });
  }

  // Render a page/form for the supplier to input their company information with Tailwind CSS and DaisyUI Stepper
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Complete Your Registration</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://cdn.jsdelivr.net/npm/daisyui@2.50.0/dist/full.css" rel="stylesheet" type="text/css" />
          <script defer>
            document.addEventListener('DOMContentLoaded', () => {
              let currentStep = 1;
              const totalSteps = 3;
    
              function showStep(step) {
                document.querySelectorAll('.step').forEach((el) => el.classList.add('hidden'));
                document.getElementById('step-' + step).classList.remove('hidden');
                updateStepper(step);
              }
    
              function nextStep() {
                if (currentStep < totalSteps) {
                  currentStep++;
                  showStep(currentStep);
                }
              }
    
              function prevStep() {
                if (currentStep > 1) {
                  currentStep--;
                  showStep(currentStep);
                }
              }
    
              function updateStepper(step) {
                document.querySelectorAll('.stepper-item').forEach((item, index) => {
                  if (index < step) {
                    item.classList.add('stepper-item-active');
                  } else {
                    item.classList.remove('stepper-item-active');
                  }
                });
              }
    
              window.showStep = showStep;
              window.nextStep = nextStep;
              window.prevStep = prevStep;
    
              showStep(currentStep);
            });
          </script>
        </head>
        <body class="bg-gray-50 flex justify-center items-center min-h-screen">
          <div class="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
            <h2 class="text-3xl font-bold mb-6 text-center text-gray-900">Complete Your Registration</h2>
            
            <!-- Step 1: Supplier Information -->
            <div class="step" id="step-1">
              <h3 class="text-xl font-semibold mb-4 text-gray-700">Step 1: Supplier Information</h3>
              <form id="step-1-form" class="space-y-4">
                <input type="hidden" name="email" value="${email}">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Company Name<span class="text-red-500">*</span></label>
                  <input type="text" name="supplierName" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required>
                </div>
                
                <div class="flex justify-end">
                  <button type="button" class="btn btn-primary" onclick="nextStep()">Next</button>
                </div>
              </form>
            </div>
            
            <!-- Step 2: Contact Information -->
            <div class="step hidden" id="step-2">
              <h3 class="text-xl font-semibold mb-4 text-gray-700">Step 2: Contact Information</h3>
              <form id="step-2-form" class="space-y-4">
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Contact Person<span class="text-red-500">*</span></label>
                  <input type="text" name="contactPerson" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Contact Email<span class="text-red-500">*</span></label>
                  <input type="email" name="contactEmail" value="${email}" required readonly class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Contact Phone<span class="text-red-500">*</span></label>
                  <input type="text" name="contactPhone" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div class="flex justify-between">
                  <button type="button" class="btn btn-secondary" onclick="prevStep()">Previous</button>
                  <button type="button" class="btn btn-primary" onclick="nextStep()">Next</button>
                </div>
              </form>
            </div>
            
            <!-- Step 3: Address & Payment Information -->
            <div class="step hidden" id="step-3">
              <h3 class="text-xl font-semibold mb-4 text-gray-700">Step 3: Address & Payment Information</h3>
              <form action="/api/supplier" method="POST" class="space-y-4">
                <input type="hidden" name="email" value="${email}">
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Street<span class="text-red-500">*</span></label>
                  <input type="text" name="street" placeholder="Street" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">City<span class="text-red-500">*</span></label>
                  <input type="text" name="city" placeholder="City" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">State<span class="text-red-500">*</span></label>
                  <input type="text" name="state" placeholder="State" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Zip Code<span class="text-red-500">*</span></label>
                  <input type="text" name="zipCode" placeholder="Zip Code" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Country<span class="text-red-500">*</span></label>
                  <input type="text" name="country" placeholder="Country" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Payment Terms<span class="text-red-500">*</span></label>
                  <input type="text" name="paymentTerms" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Rating</label>
                  <input type="number" name="rating" min="1" max="5" value="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div class="flex justify-between">
                  <button type="button" class="btn btn-secondary" onclick="prevStep()">Previous</button>
                  <button type="submit" class="btn btn-success">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </body>
      </html>
    `);
});

const sendEmail = asyncHandler(async (req, res) => {
  try {
    const { to, subject, text } = req.body; // Allow dynamic email sending
    const emailBody = `
        <html>
        <body>
          <h2>Welcome to Our Vendor Portal!</h2>
          <p>Dear Supplier,</p>
          <p>Thank you for registering with us. We are excited to have you on board!</p>
          <p>To get started, please verify your account by clicking the link below:</p>
          <p><a href="https://example.com/verify?email=${to}">Verify Your Account</a></p>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Best regards,</p>
          <p>Maddison Foo Koch</p>
          <p><small>Your Company Name</small></p>
        </body>
        </html>
      `;

    const info = await transporter.sendMail({
      from: `"Maddison Foo Koch 👻" <mtrcb32130@gmail.com>`, // Dynamic sender
      to: to || "adreyjapheth5@gmail.com", // Default recipient if none provided
      subject: subject || "Welcome to Our Vendor Portal!",
      html: emailBody, // Use the HTML body
    });

    res.status(200).json({ messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error); // Log the error
    res.status(500).json({ error: "Failed to send email" });
  }
});

// RESEND VERIFICATION EMAIL
const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  const supplier = await supplierModel.findOne({ email });

  if (!supplier) {
    return res.status(404).json({ error: "Supplier not found." });
  }

  if (supplier.status === "Active") {
    return res.status(400).json({ error: "Account already verified." });
  }

  // Check if the existing token is still valid
  if (supplier.verificationTokenExpires > Date.now()) {
    return res.status(400).json({
      error: "Verification token is still valid. Please check your email.",
    });
  }

  // Generate a new verification token
  const newVerificationToken = crypto.randomBytes(20).toString("hex");
  const newVerificationTokenExpires = Date.now() + 3600000; // 1 hour

  supplier.verificationToken = newVerificationToken;
  supplier.verificationTokenExpires = newVerificationTokenExpires;
  await supplier.save();

  // Create a new verification URL
  const verificationUrl = `https://manufacturing-logistic1-client-api.onrender.com/api/email/verify?token=${newVerificationToken}&email=${encodeURIComponent(
    email
  )}`;

  const emailContent = `
    <html>
      <body>
        <h2>Welcome Back to Our Vendor Portal!</h2>
        <p>Dear Supplier,</p>
        <p>You recently requested to resend your verification email.</p>
        <p>Please verify your account by clicking the link below:</p>
        <p><a href="${verificationUrl}">Complete Your Registration</a></p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,</p>
        <p>Your Name</p>
        <p><small>JJM MANUFACTURING</small></p>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"JJM MANUFACTURING" <mtrcb32130@gmail.com>`, // Your sender email
      to: email,
      subject: "Resend: Welcome to Our Vendor Portal!",
      html: emailContent, // Send HTML email content
    });

    res.status(200).json({
      messageId: info.messageId,
      message: "Verification email resent. Please check your inbox.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export {
  registerSupplier,
  sendEmail,
  verifyRegisterFill,
  resendVerificationEmail,
};
