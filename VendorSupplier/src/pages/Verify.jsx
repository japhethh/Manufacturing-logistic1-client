import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for validation
const schema = z.object({
  supplierName: z.string().min(1, "Company Name is required"),
  contactPerson: z.string().min(1, "Contact Person is required"),
  contactEmail: z
    .string()
    .email("Invalid email format")
    .nonempty("Email is required"),
  contactPhone: z.string().min(1, "Contact Phone is required"),
  street: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP Code is required"),
  country: z.string().min(1, "Country is required"),
  paymentTerms: z.string().min(1, "Payment Terms are required"),
});

const Verify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const supplierCode = "SO-3003";
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const ENDPOINT =
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://backend-logistic1.jjm-manufacturing.com";
  console.log(email);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      supplierName: "",
      contactPerson: "",
      contactEmail: email || "",
      contactPhone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      paymentTerms: "",
      rating: 3,
    },
  });

  useEffect(() => {
    const verifySupplier = async () => {
      try {
        const response = await axios.get(
          `${ENDPOINT}/api/email/verify`,
          {
            params: { token, email },
          }
        );
        setIsValid(true);
      } catch (error) {
        console.error("Invalid token or email:", error);
        toast.error("Invalid or expired verification link.");
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };
    if (token && email) {
      verifySupplier();
    } else {
      toast.error("Invalid verification link.");
      setLoading(false);
    }
  }, [token, email]);

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.put(
        `${ENDPOINT}/api/supplier/completeRegistration`,
        {
          ...data,
          email,
        }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
      }

      toast.success("Registration completed successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Error completing registration:", error);
      toast.error(
        error.response?.data?.error || "Failed to complete registration."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="flex flex-col justify-center items-center h-screen p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Invalid or Expired Verification Link
          </h2>
          <p className="mb-4">
            Your verification link is invalid or has expired. Please request a
            new verification email.
          </p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/resend-verification")}
          >
            Resend Verification Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Complete Your Registration
        </h2>

        {/* Stepper */}
        <ul className="steps">
          {[...Array(totalSteps)].map((_, index) => {
            const stepIndex = index + 1;
            return (
              <li
                key={stepIndex}
                className={`step ${
                  stepIndex === currentStep
                    ? "step-primary"
                    : stepIndex < currentStep
                    ? "step-completed"
                    : ""
                }`}
              >
                {stepIndex === 1 && "Supplier Information"}
                {stepIndex === 2 && "Contact Information"}
                {stepIndex === 3 && "Address & Payment Information"}
              </li>
            );
          })}
        </ul>

        {/* Step 1: Supplier Information */}
        {currentStep === 1 && (
          <div className="step" id="step-1">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Step 1: Supplier Information
            </h3>
            <form
              id="step-1-form"
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input type="hidden" name="email" value={email} />

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("supplierName")}
                  className={`w-full px-3 py-2 border ${
                    errors.supplierName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.supplierName && (
                  <p className="text-red-500 text-sm">
                    {errors.supplierName.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {currentStep === 2 && (
          <div className="step" id="step-2">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Step 2: Contact Information
            </h3>
            <form
              id="step-2-form"
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Person<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("contactPerson")}
                  className={`w-full px-3 py-2 border ${
                    errors.contactPerson ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.contactPerson && (
                  <p className="text-red-500 text-sm">
                    {errors.contactPerson.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("contactEmail")}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Phone<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("contactPhone")}
                  className={`w-full px-3 py-2 border ${
                    errors.contactPhone ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.contactPhone && (
                  <p className="text-red-500 text-sm">
                    {errors.contactPhone.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrev}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Address & Payment Information */}
        {currentStep === 3 && (
          <div className="step" id="step-3">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Step 3: Address & Payment Information
            </h3>
            <form
              id="step-3-form"
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Street Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("street")}
                  className={`w-full px-3 py-2 border ${
                    errors.street ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.street && (
                  <p className="text-red-500 text-sm">
                    {errors.street.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("city")}
                  className={`w-full px-3 py-2 border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("state")}
                  className={`w-full px-3 py-2 border ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ZIP Code<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("zipCode")}
                  className={`w-full px-3 py-2 border ${
                    errors.zipCode ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("country")}
                  className={`w-full px-3 py-2 border ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Terms<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("paymentTerms")}
                  className={`w-full px-3 py-2 border ${
                    errors.paymentTerms ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.paymentTerms && (
                  <p className="text-red-500 text-sm">
                    {errors.paymentTerms.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrev}
                >
                  Back
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
