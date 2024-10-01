import { useState } from 'react';

const RegistrationForm = ({ email }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const showStep = (step) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Complete Your Registration</h2>

        {/* Step 1: Supplier Information */}
        {currentStep === 1 && (
          <div className="step" id="step-1">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Step 1: Supplier Information</h3>
            <form id="step-1-form" className="space-y-4">
              <input type="hidden" name="email" value={email} />

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="supplierName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end">
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {currentStep === 2 && (
          <div className="step hidden" id="step-2">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Step 2: Contact Information</h3>
            <form id="step-2-form" className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Person<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={email}
                  required
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
                  name="contactPhone"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  Previous
                </button>
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Address & Payment Information */}
        {currentStep === 3 && (
          <div className="step hidden" id="step-3">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Step 3: Address & Payment Information</h3>
            <form action="/api/supplier" method="POST" className="space-y-4">
              <input type="hidden" name="email" value={email} />

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Street<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Zip Code<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Terms<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="paymentTerms"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  defaultValue="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  Previous
                </button>
                <button type="submit" className="btn btn-success">Submit</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
